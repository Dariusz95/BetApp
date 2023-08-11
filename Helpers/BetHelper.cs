using BetApp.Enums;

namespace BetApp.Helpers
{
	public static class BetHelper
	{
		public static bool CheckIfBetIsWin(BetType betType, int teamAScore, int teamBScore)
		{
			int goalsAmount = (teamAScore > 0 ? teamAScore : 0) + (teamBScore > 0 ? teamBScore : 0);

			switch (betType)
			{
				case BetType.TeamA:
					return teamAScore > 0 && teamBScore > 0 ? teamAScore > teamBScore : false;
				case BetType.TeamB:
					return teamAScore > 0 && teamBScore > 0 ? teamAScore < teamBScore : false;
				case BetType.Draw:
					return teamAScore > 0 && teamBScore > 0 ? teamAScore == teamBScore : false;
				case BetType.Minus2_5:
					return goalsAmount < 2.5;
				case BetType.Minus3_5:
					return goalsAmount < 3.5;
				case BetType.Minus4_5:
					return goalsAmount < 4.5;
				case BetType.Plus2_5:
					return goalsAmount > 2.5;
				case BetType.Plus3_5:
					return goalsAmount > 3.5;
				case BetType.Plus4_5:
					return goalsAmount > 4.5;
				default:
					return false;
			}
		}
	}
}
