using BetApp.Data;
using BetApp.Interfaces;
using BetApp.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Match = BetApp.Models.Match;
using BetApp.Requests;


namespace BetApp.Services
{
	public class MatchService : IMatchService
	{
		private readonly TeamContext _context;
		private readonly IHubContext<MatchHub> _hubContext;
		private readonly ITeamService _teamService;
		private readonly IServiceProvider _serviceProvider;
		private readonly Random _random;


		public MatchService(TeamContext context, IHubContext<MatchHub> hubContext, ITeamService teamService, IServiceProvider serviceProvider)
		{
			_context = context;
			_hubContext = hubContext;
			_teamService = teamService;
			_serviceProvider = serviceProvider;
			_random = new Random();

		}

		public async Task<List<Match>> GetMatches()
		{
			var teams = await _context.Teams.ToListAsync();
			var matches = new List<Match>();

			var random = new Random();
			while (teams.Count >= 2)
			{
				int index1 = random.Next(teams.Count);
				var team1 = teams[index1];

				teams.RemoveAt(index1);

				int index2 = random.Next(teams.Count);
				var team2 = teams[index2];

				teams.RemoveAt(index2);

				var bothTeamsPower = team1.Power + team2.Power;
				var match = new Match
				{
					Id = Guid.NewGuid(),
					TeamA = team1,
					TeamB = team2,
					TeamACourse = Math.Round((decimal)bothTeamsPower / team1.Power, 2),
					TeamBCourse = Math.Round((decimal)bothTeamsPower / team2.Power, 2),
					DrawCourse = 3.3
				};
				matches.Add(match);
			}

			return matches;
		}

		public async Task StartMatchSimulations(string connectionId, List<MatchRequest> matchRequests)
		{
			foreach (var matchRequest in matchRequests)
			{
				var teamA = await _teamService.GetTeamById(matchRequest.TeamAId);
				var teamB = await _teamService.GetTeamById(matchRequest.TeamBId);

				var matchData = new MatchResult
				{
					Id = matchRequest.MatchId,
					TeamA = teamA,
					TeamB = teamB,
					TeamAScore = 0,
					TeamBScore = 0,
					Counter = 0
				};

				await _hubContext.Groups.AddToGroupAsync(connectionId, matchRequest.MatchId.ToString("D"));

				_ = SimulateMatch(connectionId, matchRequest.MatchId, matchData); // Rozpoczęcie symulacji meczu w osobnym wątku
			}
		}

		private async Task SimulateMatch(string connectionId, Guid matchId, MatchResult matchData)
		{
			double firstTeamgoalChance = (double)matchData.TeamA.Power / 20;
			double secondTeamgoalChance = (double)matchData.TeamB.Power / 20;

			while (matchData.Counter <= 90)
			{
				if (IsTeamScoredGoal(firstTeamgoalChance))
				{
					matchData.TeamAScore++;
				}

				if (IsTeamScoredGoal(secondTeamgoalChance))
				{
					matchData.TeamBScore++;
					
				}

				await _hubContext.Clients.Group(matchId.ToString("D")).SendAsync("CounterUpdated", matchData);
				await Task.Delay(50);
				matchData.Counter++;
			}

			await _hubContext.Clients.Group(matchId.ToString("D")).SendAsync("MatchFinished");

			await _hubContext.Groups.RemoveFromGroupAsync(connectionId, matchId.ToString("D"));
		}

		private bool IsTeamScoredGoal(double goalChance)
		{
			double randomNumber = _random.NextDouble() * 100;

			return randomNumber <= goalChance;
		}
	}
}
