using BetApp.Interfaces;
using BetApp.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Match = BetApp.Models.Match;
using BetApp.Requests;
using BetApp.Enums;
using BetApp.Data;
using BetApp.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace BetApp.Services
{
    public class MatchService : IMatchService
	{
		private readonly BetContext _context;
		private readonly IHubContext<MatchHub> _hubContext;
		private readonly ITeamService _teamService;
		private readonly IServiceProvider _serviceProvider;
		private readonly Random _random;


		public MatchService(BetContext context, IHubContext<MatchHub> hubContext, ITeamService teamService, IServiceProvider serviceProvider)
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
					MainTypes = new Dictionary<MainType, decimal>
					{
						{ MainType.TeamA, Math.Round((decimal)bothTeamsPower / team1.Power, 2) },
						{ MainType.TeamB, Math.Round((decimal)bothTeamsPower / team2.Power, 2) },
						{ MainType.Draw, 3.3m }
					}

				};
				matches.Add(match);
			}

			return matches;
		}

		public async Task StartMatchSimulations(string connectionId, List<MatchRequest> matchRequests)
		{
			var coupon = new Coupon
			{
				Id = Guid.NewGuid(),
				BetValue = 100,
				IsWin = false,
				TotalCourse = 1,
				MatchResults = new List<MatchResult>()
			};

			decimal totalCourse = 1.0M;

			List<MatchResult> initialMatches = new List<MatchResult>();

			foreach (var matchRequest in matchRequests)
			{
				totalCourse *= matchRequest.BetCourse;
				var teamA = await _teamService.GetTeamById(matchRequest.TeamAId);
				var teamB = await _teamService.GetTeamById(matchRequest.TeamBId);

				var initialMatchData = new MatchResult
				{
					Id = matchRequest.MatchId,
					TeamA = teamA,
					TeamB = teamB,
					BetTypeCourse = matchRequest.BetCourse,
					BetType = matchRequest.BetType,
					TeamAScore = 0,
					TeamBScore = 0,
					Counter = 0
				};

				initialMatches.Add(initialMatchData);

/*				_context.MatchResults.Add(initialMatchData);*/
				coupon.MatchResults.Add(initialMatchData);

				await _hubContext.Groups.AddToGroupAsync(connectionId, matchRequest.MatchId.ToString("D"));
			}
			coupon.TotalCourse = totalCourse;

			await _context.MatchResults.AddRangeAsync(initialMatches);

			_context.Coupons.Add(coupon);

			await _context.SaveChangesAsync();

			var simulationTasks = new List<Task<MatchResult>>();

			foreach (var initialMatchData in initialMatches)
			{
				var simulationTask = SimulateMatch(connectionId, initialMatchData);
				simulationTasks.Add(simulationTask);
			}

			var simulatedMatches = new List<MatchResult>();

			while (simulationTasks.Count > 0)
			{
				var completedTask = await Task.WhenAny(simulationTasks);
				simulationTasks.Remove(completedTask);

				MatchResult simulatedMatch = await completedTask;
				simulatedMatches.Add(simulatedMatch);
			}

			bool allMatchesWon = simulatedMatches.All(match => match.IsWin == true);

			await _hubContext.Clients.Client(connectionId).SendAsync("matchesCompleted", allMatchesWon);

			await UpdateMatches(simulatedMatches);
		}

		private async Task<MatchResult> SimulateMatch(string connectionId, MatchResult matchData)
		{
			var simulatedMatch = new MatchResult
			{
				Id = matchData.Id,
				TeamA = matchData.TeamA,
				TeamB = matchData.TeamB,
				BetTypeCourse = matchData.BetTypeCourse,
				BetType = matchData.BetType,
				TeamAScore = matchData.TeamAScore,
				TeamBScore = matchData.TeamBScore,
				Counter = matchData.Counter
			};

			double firstTeamgoalChance = (double)simulatedMatch.TeamA.Power / 20;
			double secondTeamgoalChance = (double)simulatedMatch.TeamB.Power / 20;

			while (simulatedMatch.Counter <= 90)
			{
				if (simulatedMatch.Counter == 0)
				{
					await Task.Delay(1500);
				}

				if (IsTeamScoredGoal(firstTeamgoalChance))
				{
					simulatedMatch.TeamAScore++;
				}

				if (IsTeamScoredGoal(secondTeamgoalChance))
				{
					simulatedMatch.TeamBScore++;

				}

				await _hubContext.Clients.Group(simulatedMatch.Id.ToString("D")).SendAsync("CounterUpdated", simulatedMatch);
				await Task.Delay(50);

				simulatedMatch.Counter++;
			}

			simulatedMatch.IsWin = BetHelper.CheckIfBetIsWin(simulatedMatch.BetType, simulatedMatch.TeamAScore, simulatedMatch.TeamBScore);
			simulatedMatch.IsOver = true;

			await _hubContext.Clients.Group(simulatedMatch.Id.ToString("D")).SendAsync("CounterUpdated", simulatedMatch);

			await _hubContext.Groups.RemoveFromGroupAsync(connectionId, simulatedMatch.Id.ToString("D"));

			return simulatedMatch;
		}

		private bool IsTeamScoredGoal(double goalChance)
		{
			double randomNumber = _random.NextDouble() * 100;

			return randomNumber <= goalChance;
		}

		private async Task UpdateMatches(List<MatchResult> simulatedMatches)
		{
			foreach (var simulatedMatch in simulatedMatches)
			{
				try
				{
					var match = await _context.MatchResults.SingleOrDefaultAsync(i => i.Id == simulatedMatch.Id);
					if (match == null)
					{
						throw new Exception("Not found");
					}

					match.TeamAScore = simulatedMatch.TeamAScore;
					match.TeamBScore = simulatedMatch.TeamBScore;
					match.IsWin = simulatedMatch.IsWin;

					await _context.SaveChangesAsync();
				}
				catch (Exception ex)
				{
					throw new Exception("Something went wrong - " + ex);
				}
			}
		}

	}

}
