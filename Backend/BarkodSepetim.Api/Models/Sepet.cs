using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BarkodSepetim.Api.Models
{
    public class Sepet
    {
        [Key]
        public int SepetID { get; set; }

        [Required]
        public int KullaniciID { get; set; }

        [Required]
        public int UrunID { get; set; }

        [Required]
        public int Miktar { get; set; } = 1;

        public DateTime EklemeTarihi { get; set; } = DateTime.UtcNow;

        // İlişkiler
        [ForeignKey("KullaniciID")]
        public virtual Kullanici Kullanici { get; set; } = null!; // null olamaz

        [ForeignKey("UrunID")]
        public virtual Urun Urun { get; set; } = null!; // null olamaz
    }
}