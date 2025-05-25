using BarkodSepetim.Api.Data;
using BarkodSepetim.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BarkodSepetim.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrunlerController : ControllerBase
    {
        private readonly BarkodSepetimDbContext _context;

        public UrunlerController(BarkodSepetimDbContext context)
        {
            _context = context;
        }

        // GET: api/urunler
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Urun>>> GetUrunler()
        {
            return await _context.Urunler.ToListAsync();
        }

        // GET: api/urunler/{barkod}
        [HttpGet("{barkod}")]
        public async Task<ActionResult<Urun>> GetUrun(string barkod)
        {
            var urun = await _context.Urunler.FirstOrDefaultAsync(u => u.Barkod == barkod);

            if (urun == null)
            {
                return NotFound(new { message = "Bu barkoda sahip ürün bulunamadı." });
            }

            return urun;
        }

        // POST: api/urunler
        // Yeni ürün eklemek için endpoint
        [HttpPost]
        public async Task<ActionResult<Urun>> PostUrun(Urun urun)
        {
            // Aynı barkodla başka bir ürün var mı diye kontrol et (isteğe bağlı ama iyi bir pratik)
            if (await _context.Urunler.AnyAsync(u => u.Barkod == urun.Barkod))
            {
                // BadRequest veya Conflict (409) dönebilirsiniz.
                // Conflict daha uygun olabilir çünkü kaynak çakışması var.
                return Conflict(new { message = "Bu barkod numarası zaten kayıtlı." });
            }

            _context.Urunler.Add(urun);
            await _context.SaveChangesAsync(); // Değişiklikleri veritabanına kaydet

            // Oluşturulan ürünü ve 201 Created durum kodunu dön.
            // CreatedAtAction, ürünün detayını getirecek GetUrun endpoint'ine bir referans oluşturur.
            return CreatedAtAction(nameof(GetUrun), new { barkod = urun.Barkod }, urun);
        }
    }
}