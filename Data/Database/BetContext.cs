using System.Buffers.Text;
using System.Net.NetworkInformation;
using BetApp.Models;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

namespace BetApp.Data
{
    public class BetContext : DbContext
    {
        public DbSet<Team> Teams { get; set; }
        public DbSet<MatchResult> MatchResults { get; set; }
        public DbSet<Coupon> Coupons { get; set; }

        public BetContext(DbContextOptions<BetContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Team>()
                .Property(t => t.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Team>().HasData(
                new Team { Id = Guid.NewGuid(), Name = "Intor Mediolan", ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/2048px-FC_Internazionale_Milano_2021.svg.png", Power = 90 },
                new Team { Id = Guid.NewGuid(), Name = "FC.Barceluna", ImageUrl = "https://assets.stickpng.com/images/584a9b3bb080d7616d298777.png", Power = 75 },
                new Team { Id = Guid.NewGuid(), Name = "Manchester Citi", ImageUrl = "https://logodownload.org/wp-content/uploads/2017/02/manchester-city-fc-logo-escudo-badge.png", Power = 90 },
                new Team { Id = Guid.NewGuid(), Name = "Lagia Warszawa", ImageUrl = "url_druzyny_c", Power = 100 },
                new Team { Id = Guid.NewGuid(), Name = "Manchuster United", ImageUrl = "https://upload.wikimedia.org/wikipedia/hif/f/ff/Manchester_United_FC_crest.png", Power = 65 },
                new Team { Id = Guid.NewGuid(), Name = "Juventus Turin", ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Juventus_Logo.png/1200px-Juventus_Logo.png", Power = 78 }
                );
        }
    }
}
