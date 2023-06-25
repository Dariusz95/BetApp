using betApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BetApp.Data
{
	public class UserContext : DbContext
	{
		public DbSet<User> Users { get; set; }
		public UserContext(DbContextOptions<UserContext> options) : base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.Entity<User>()
				.Property<int>("Id")
				.IsRequired();
		}
	}

}
