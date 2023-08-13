using BetApp.Interfaces;
using betApp.Models;
using System.Security.Claims;

public class CurrentUserService : ICurrentUserService
{
	private readonly IHttpContextAccessor _httpContextAccessor;
	private readonly IUserRepository _userRepository;

	public CurrentUserService(IHttpContextAccessor httpContextAccessor, IUserRepository userRepository)
	{
		_httpContextAccessor = httpContextAccessor;
		_userRepository = userRepository;
	}

	public Guid GetCurrentUserId()
	{
		var userIdClaim = _httpContextAccessor.HttpContext.User.Claims
			.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

		if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out Guid userId))
		{
			return userId;
		}

		return Guid.Empty;
	}

	public async Task<User> GetCurrentLoggedInUser()
	{
		Guid userId = GetCurrentUserId();

		if (userId != Guid.Empty)
		{
			return await _userRepository.GetUserById(userId);
		}

		return null;
	}
}