using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using BetApp.Models;

namespace betApp.Models
{
	[Table("Users")]
	public class User
	{
		public Guid Id { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string Email { get; set; }
		[Required]
		[JsonIgnore]
		public string Password {get;set;}
		public decimal CoinsAmount {get; set; } = 0;
		public ICollection<Coupon> Coupons { get; set; }
	}
}
