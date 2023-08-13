using betApp.Models;

namespace BetApp.Interfaces
{
    public interface IUserRepository
    {
		Task<User> Create(User user);
        User GetByEmail(string email);
		Task<User> GetUserById(Guid id);
	}
}
