using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BetApp.Models
{
	[Table("Teams")]
	public class Team
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string ImageUrl { get; set; }
		public int Power { get; set; }
	}
}
