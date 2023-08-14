using System.Security.Claims;
using betApp.Models;

namespace BetApp.Interfaces
{
    public interface IUserRepository
    {
		Task<User> Create(User user);
		Task<User> GetByEmail(string email);
		Task<User> GetUserById(Guid id);
		Task<User> GetCurrentUserAsync(ClaimsPrincipal userClaims);
	}
}
