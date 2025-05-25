using BarkodSepetim.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BarkodSepetim.Api.Data
{
    public class BarkodSepetimDbContext : DbContext
    {
        // Constructor: Bu, DbContext'e nasıl yapılandırılacağını söyler (Program.cs'den gelecek).
        public BarkodSepetimDbContext(DbContextOptions<BarkodSepetimDbContext> options) : base(options)
        {
        }

        // Veritabanı tablolarımıza karşılık gelen DbSet'ler:
        public DbSet<Kullanici> Kullanicilar { get; set; }
        public DbSet<Urun> Urunler { get; set; }
        public DbSet<Sepet> Sepet { get; set; }

        // (İsteğe bağlı) Model yapılandırmaları (örneğin, benzersiz anahtarlar)
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // KullaniciAdi'nın benzersiz olmasını sağla
            modelBuilder.Entity<Kullanici>()
                .HasIndex(k => k.KullaniciAdi)
                .IsUnique();

            // Barkod'un benzersiz olmasını sağla
            modelBuilder.Entity<Urun>()
                .HasIndex(u => u.Barkod)
                .IsUnique();

            // Sepette bir kullanıcı için aynı üründen sadece bir satır olmasını sağla
            modelBuilder.Entity<Sepet>()
                .HasIndex(s => new { s.KullaniciID, s.UrunID })
                .IsUnique();
        }
    }
}