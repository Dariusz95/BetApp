using BetApp.Models;

namespace BetApp.Interfaces
{
	public interface ITeamService
	{
		public Task<Team> GetTeamById(Guid TeamId);
	}
}
