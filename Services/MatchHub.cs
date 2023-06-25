using System;
using System.Threading.Tasks;
using BetApp.Data;
using BetApp.Interfaces;
using BetApp.Models;
using BetApp.Requests;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;

namespace BetApp.Services
{
	public class MatchHub : Hub
	{
		private readonly IMatchService _matchService;

		public MatchHub(IMatchService matchService)
		{
			_matchService = matchService;
		}

		public async Task StartMatch(List<MatchRequest> matchRequest)
		{
			await _matchService.StartMatchSimulations(Context.ConnectionId, matchRequest);
		}
	}
}