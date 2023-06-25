namespace BetApp.Models
{
	public class MatchContainer
	{
		public int Counter { get; set; }
		public List<MatchResult> Matches { get; set; }

		public MatchContainer()
		{
			Counter = 0;
			Matches = new List<MatchResult>();
		}
	}
}
