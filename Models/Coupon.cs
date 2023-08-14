using betApp.Models;

namespace BetApp.Models
{
	public class Coupon
	{
		public Guid Id { get; set; }
		public int BetValue { get; set; }
		public bool IsWin { get; set; }
		public decimal TotalCourse { get; set; }

		public ICollection<MatchResult> MatchResults { get; set; }
		public User User { get; set; }
	}
}
