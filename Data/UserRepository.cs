using betApp.Models;
using BetApp.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BetApp.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly BetContext _context;

        public UserRepository(BetContext context)
        {
            _context = context;
        }
        public async Task<User> Create(User user)
        {
            user.Id = new Guid();
            _context.Users.Add(user);
			await _context.SaveChangesAsync();
			return user;
		}

        public User GetByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }

		public async Task<User> GetUserById(Guid id)
		{
			return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
		}
	}
}
