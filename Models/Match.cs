using BetApp.Enums;

namespace BetApp.Models
{
	public class Match
	{
		public Guid Id { get; set; }
		public Team TeamA { get; set; }
		public Team TeamB { get; set; }
		public Dictionary<MainType, decimal> MainTypes { get; set; } = new Dictionary<MainType, decimal>
		{
			{ MainType.TeamA, 2 },
			{ MainType.TeamB, 2 },
			{ MainType.Draw, 3.3m }
		};
		public Dictionary<GoalType, decimal> GoalTypes { get; set; } = new Dictionary<GoalType, decimal>
		{
			{ GoalType.Minus2_5, 3.33m },
			{ GoalType.Plus2_5, 1.42m },
			{ GoalType.Minus3_5, 2},
			{ GoalType.Plus3_5, 2 },
			{ GoalType.Minus4_5, 1.44m },
			{ GoalType.Plus4_5, 3.33m },
		};
	}
}
