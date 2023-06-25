using BetApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BetApp.Data
{
	public class TeamContext : DbContext
	{
		public DbSet<Team> Teams { get; set; }

		public TeamContext(DbContextOptions<TeamContext> options) : base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Team>()
				.Property(t => t.Id)
				.ValueGeneratedOnAdd();

			modelBuilder.Entity<Team>().HasData(
				new Team { Id = Guid.NewGuid(), Name = "Drużyna A", ImageUrl = "url_druzyny_a", Power = 80 },
				new Team { Id = Guid.NewGuid(), Name = "Drużyna B", ImageUrl = "url_druzyny_b", Power = 75 },
				new Team { Id = Guid.NewGuid(), Name = "Drużyna C", ImageUrl = "url_druzyny_c", Power = 90 },
				new Team { Id = Guid.NewGuid(), Name = "Drużyna D", ImageUrl = "url_druzyny_c", Power = 65 }
			);
		}
	}
}
