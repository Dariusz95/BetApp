using System.Security.Claims;
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

		public async Task<User> GetByEmail(string email)
		{
			try
			{
				return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
			}
			catch (Exception ex)
			{
				throw new Exception("Error while getting user by email", ex);
			}
		}

		public async Task<User> GetUserById(Guid id)
		{
			try
			{
				return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
			}
			catch (Exception ex)
			{
				throw new Exception("Error while getting user by ID", ex);
			}
		}

		public async Task<User> GetCurrentUserAsync(ClaimsPrincipal userClaims)
		{
			var userId = userClaims.FindFirstValue("Id");

			if (Guid.TryParse(userId, out Guid userIdGuid))
			{
				return await _context.Users.FirstOrDefaultAsync(u => u.Id == userIdGuid);
			}

			return null;
		}
	}
}
