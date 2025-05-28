using BarkodSepetim.Api.Data;
using BarkodSepetim.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace BarkodSepetim.Api.Controllers
{
    [Route("api/sepet")]
    [ApiController]
    public class SepetController : ControllerBase
    {
        private readonly BarkodSepetimDbContext _context;

        public SepetController(BarkodSepetimDbContext context)
        {
            _context = context;
        }

        // GET: api/sepet/{kullaniciId}
        // Belirli bir kullanıcının sepetindeki ürünleri getirir
        [HttpGet("{kullaniciId}")]
        public async Task<ActionResult<IEnumerable<Sepet>>> GetKullaniciSepeti(int kullaniciId)
        {
            var kullanici = await _context.Kullanicilar.FindAsync(kullaniciId);
            if (kullanici == null)
            {
                return NotFound(new { message = "Kullanıcı bulunamadı." });
            }

            var sepetUrunleri = await _context.Sepet
                                        .Where(s => s.KullaniciID == kullaniciId)
                                        .Include(s => s.Urun) // Ürün bilgilerini de dahil et
                                        .ToListAsync();

            // Sepet boşsa bile boş bir liste dönmek daha iyi bir pratik
            return Ok(sepetUrunleri ?? new List<Sepet>());
        }

        // POST: api/sepet/{kullaniciId}/ekle
        // Kullanıcının sepetine ürün ekler veya mevcut ürünün miktarını artırır.
        // İstek gövdesinde UrunID ve Miktar beklenir.
        public class SepeteEkleRequestDto
        {
            public int UrunID { get; set; }
            public int Miktar { get; set; } = 1; // Varsayılan miktar 1
        }

        [HttpPost("{kullaniciId}/ekle")]
        public async Task<IActionResult> EkleVeyaGuncelle(int kullaniciId, [FromBody] SepeteEkleRequestDto request)
        {
            if (request.Miktar <= 0)
            {
                return BadRequest(new { message = "Miktar pozitif bir değer olmalıdır." });
            }

            var kullanici = await _context.Kullanicilar.FindAsync(kullaniciId);
            if (kullanici == null)
            {
                return NotFound(new { message = "Kullanıcı bulunamadı." });
            }

            var urun = await _context.Urunler.FindAsync(request.UrunID);
            if (urun == null)
            {
                return NotFound(new { message = "Ürün bulunamadı." });
            }

            // Stok kontrolü
            if (urun.Stok < request.Miktar)
            {
                // Eğer sepette bu üründen varsa, eklenebilecek miktarı ona göre ayarla
                var mevcutSepetUrunu = await _context.Sepet
                    .FirstOrDefaultAsync(s => s.KullaniciID == kullaniciId && s.UrunID == request.UrunID);

                int sepettekiMiktar = mevcutSepetUrunu?.Miktar ?? 0;
                if (urun.Stok < sepettekiMiktar + request.Miktar)
                {
                    return BadRequest(new { message = $"Yetersiz stok. Bu üründen en fazla {urun.Stok - sepettekiMiktar} adet daha ekleyebilirsiniz." });
                }
            }


            var sepetUrunu = await _context.Sepet
                .FirstOrDefaultAsync(s => s.KullaniciID == kullaniciId && s.UrunID == request.UrunID);

            if (sepetUrunu != null)
            {
                // Ürün sepette zaten var, miktarını artır
                sepetUrunu.Miktar += request.Miktar;
                // Yeni miktar stoğu aşıyor mu diye tekrar kontrol edelim
                if (urun.Stok < sepetUrunu.Miktar)
                {
                    return BadRequest(new { message = $"Yetersiz stok. Sepetinizdeki bu ürünle birlikte en fazla {urun.Stok} adet olabilir." });
                }
            }
            else
            {
                // Ürün sepette yok, yeni ekle
                if (urun.Stok < request.Miktar)
                { // Bu kontrol zaten yukarıda var ama çift güvenlik
                    return BadRequest(new { message = $"Yetersiz stok. Bu üründen en fazla {urun.Stok} adet ekleyebilirsiniz." });
                }
                sepetUrunu = new Sepet
                {
                    KullaniciID = kullaniciId,
                    UrunID = request.UrunID,
                    Miktar = request.Miktar,
                    EklemeTarihi = DateTime.UtcNow
                };
                _context.Sepet.Add(sepetUrunu);
            }

            await _context.SaveChangesAsync();

            // Başarılı bir şekilde eklenen veya güncellenen sepet ürününü veya tüm sepeti dönebiliriz.
            // Şimdilik basit bir başarı mesajı dönelim.
            // Daha iyisi, güncellenmiş sepet ürününü veya tüm sepeti dönmek olurdu.
            return Ok(new { message = "Ürün sepete eklendi/güncellendi.", sepetUrunu });
        }
    }
}