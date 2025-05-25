using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace BarkodSepetim.Api.Models
{
    public class Kullanici
    {
        [Key] // Bu alanın Primary Key olduğunu belirtir
        public int KullaniciID { get; set; }

        [Required] // Bu alanın zorunlu olduğunu belirtir
        [StringLength(100)] // Maksimum uzunluk
        public string KullaniciAdi { get; set; } = string.Empty; // <<<=== DÜZELTME

        [Required]
        public string SifreHash { get; set; } = string.Empty; // <<<=== DÜZELTME

        [StringLength(150)]
        public string? Email { get; set; } // Email null olabilir (?)

        public DateTime OlusturmaTarihi { get; set; } = DateTime.UtcNow;

        // İlişkiler (EF Core için)
        public virtual ICollection<Urun> EklenenUrunler { get; set; } = new List<Urun>();
        public virtual ICollection<Sepet> SepetUrunleri { get; set; } = new List<Sepet>();
    }
}