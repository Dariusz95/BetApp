using System.Net;
using System.Security.Claims;
using betApp.Models;
using BetApp.Dtos;
using BetApp.Helpers;
using BetApp.Interfaces;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BetApp.Controllers
{
    [Route("api")]
	[ApiController]
	public class AuthController:Controller
	{
		private readonly IUserRepository _userRepository;
		private readonly JwtService _jwtService;

		public AuthController(IUserRepository userRepository, JwtService jwtService)
		{
			_userRepository = userRepository;
			_jwtService = jwtService;
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register(RegisterDto dto)
		{
			try
			{
				var existingUser = _userRepository.GetByEmail(dto.Email);

				if (existingUser != null)
				{
					return Conflict(new { message = "User with this email already exists" });
				}

				var user = new User
				{
					Name = dto.Name,
					Email = dto.Email,
					Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
					CoinsAmount = 0
				};

				await _userRepository.Create(user);

				return Created("success", new { message = "User registered successfully" });
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { message = "Internal Server Error" });
			}
		}


		[HttpPost("login")]
		public async Task<IActionResult> Login(LoginDto dto)
		{
			var user = await _userRepository.GetByEmail(dto.Email);

			if (user == null)
			{
				return BadRequest(new { message = "Invalid Credentials" });
			}

			if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
			{
				return BadRequest(new { message = "Invalid Credentials" });
			}

			var claims = new List<Claim>
			{
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
				new Claim("Id", user.Id.ToString()),
				new Claim(ClaimTypes.Name, user.Name),
            };

			var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

			await HttpContext.SignInAsync(
				CookieAuthenticationDefaults.AuthenticationScheme,
				new ClaimsPrincipal(claimsIdentity),
				new AuthenticationProperties
				{
					IsPersistent = true
				});

			return Ok(new { message = "success" });
		}

		[HttpGet("current-user")]
		public async Task<IActionResult> GetCurrentUser()
		{
			try
			{
				var user = await _userRepository.GetCurrentUserAsync(User);

				if (user != null)
				{
					return Ok(new
					{
						UserId = user.Id,
						UserName = user.Name,
						CoinsAmount = user.CoinsAmount
					});
				}

				return NotFound();
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { message = "Internal Server Error" });
			}
		}

		[HttpPost("logout")]
		public IActionResult Logout()
		{
			Response.Cookies.Delete("jwt", new CookieOptions() { Secure = true, HttpOnly = true, SameSite = SameSiteMode.None });

			return Ok(new { message = "logout success" });
		}

		[HttpPost("refreshToken")]
		public IActionResult RefreshToken([FromBody] string jwtToken)
		{
			var token = _jwtService.Verify(jwtToken);

			Response.Cookies.Delete("jwt", new CookieOptions() { Secure = true, HttpOnly = true, SameSite = SameSiteMode.None });

			var newRefreshToken = _jwtService.GenerateRefreshToken();

			Response.Cookies.Append("jwt", jwtToken, new CookieOptions() { Secure = true, HttpOnly = true, SameSite = SameSiteMode.None });

			Response.Cookies.Append("refreshToken", newRefreshToken, new CookieOptions() { Secure = true, HttpOnly = true, SameSite = SameSiteMode.None });

			return Ok(new { AccessToken = token, RefreshToken = newRefreshToken });
		}

	}
}
