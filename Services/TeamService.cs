﻿using BetApp.Data;
using BetApp.Interfaces;
using BetApp.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace BetApp.Services
{
    public class TeamService:ITeamService
	{
		private readonly BetContext _context;

		public TeamService(BetContext context)
		{
			_context = context;

		}

		public async Task<Team> GetTeamById(Guid teamId)
		{
			var team = await _context.Teams.FirstOrDefaultAsync(t => t.Id == teamId);
			return team;
		}
	}
}
