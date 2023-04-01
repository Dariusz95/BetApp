using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace betApp.Models
{
	[Table("Users")]
	public class User
	{
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string Email { get; set; }
		[Required]
		[JsonIgnore]
		public string Password {get;set;}
		public int amount {get; set;}
	}
}
