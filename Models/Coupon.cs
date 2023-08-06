namespace BetApp.Models
{
	public class Coupon
	{
		public Guid Id { get; set; }
		public int PotentialWinValue { get; set; }
		public bool IsCouponWin { get; set; }
		public decimal Course { get; set; }

		public ICollection<MatchResult> MatchResults { get; set; }
	}
}
