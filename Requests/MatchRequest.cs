namespace BetApp.Requests
{
	public class MatchRequest
	{
		public Guid MatchId { get; set; }
		public Guid TeamAId { get; set; }
		public Guid TeamBId { get; set; }
	}
}
