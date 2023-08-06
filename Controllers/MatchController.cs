using BetApp.Interfaces;
using BetApp.Models;
using BetApp.Requests;
using Microsoft.AspNetCore.Mvc;

namespace BetApp.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class MatchController : ControllerBase
	{
		private readonly IMatchService _matchService;

		public MatchController(IMatchService matchService)
		{
			_matchService = matchService;
		}

		[HttpGet]
		public async Task<IActionResult> GetMatches()
		{
			var matches = await _matchService.GetMatches();
			return Ok(matches);
		}

		[HttpPost("addCoupon")]
		public async Task<IActionResult> AddMatchResultsToCoupon(List<MatchResult> matchResults)
		{

			await _matchService.AddCoupon(matchResults);
			return Ok();
		
		}
	}
}
