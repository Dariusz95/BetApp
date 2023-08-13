using betApp.Models;

public interface ICurrentUserService
{
	Guid GetCurrentUserId();
	Task<User> GetCurrentLoggedInUser();
}