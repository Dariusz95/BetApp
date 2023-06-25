namespace BetApp.Models
{
	public class MatchResult
	{
		public Guid Id { get; set; }
		public Team TeamA { get; set; }
		public Team TeamB { get; set; }
		public int TeamAScore { get; set; }
		public int TeamBScore { get; set; }
		public int Counter { get; set; }
	}
}
