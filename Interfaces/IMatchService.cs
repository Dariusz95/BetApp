using System.Text.RegularExpressions;
using BetApp.Models;
using BetApp.Requests;
using Match = BetApp.Models.Match;

namespace BetApp.Interfaces
{
	public interface IMatchService
	{
		Task<List<Match>> GetMatches();
		Task StartMatchSimulations(string connectionId, List<MatchRequest> matchRequests);
		Task AddCoupon(IList<MatchResult> matchResults);
		Task AddMatchResult(MatchResult matchResult);
	}
}
