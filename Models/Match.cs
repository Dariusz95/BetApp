namespace BetApp.Models
{
	public class Match
	{
		public Guid Id { get; set; }
		public Team TeamA { get; set; }
		public Team TeamB { get; set; }
		public decimal TeamACourse { get; set; } = 2;
		public decimal TeamBCourse { get; set; } = 2;
	}
}
