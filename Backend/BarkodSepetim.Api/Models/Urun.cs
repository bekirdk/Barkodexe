using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; // [Column] için

namespace BarkodSepetim.Api.Models
{
    public class Urun
    {
        [Key]
        public int UrunID { get; set; }

        [Required]
        [StringLength(100)]
        public string Barkod { get; set; }

        [Required]
        [StringLength(200)]
        public string UrunAdi { get; set; }

        [Required]
        [Column(TypeName = "decimal(10, 2)")] // Veritabanı tipiyle eşleşsin
        public decimal Fiyat { get; set; }

        public int Stok { get; set; } = 0; // Stok alanı eklendi

        public string? Aciklama { get; set; }

        public int? EkleyenKullaniciID { get; set; } // Kimin eklediği (null olabilir)

        public DateTime OlusturmaTarihi { get; set; } = DateTime.UtcNow;

        // İlişkiler
        [ForeignKey("EkleyenKullaniciID")]
        public virtual Kullanici? EkleyenKullanici { get; set; }
        public virtual ICollection<Sepet> SepettekiUrunler { get; set; } = new List<Sepet>();
    }
}