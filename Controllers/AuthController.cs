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
		public IActionResult Register(RegisterDto dto){

			var user = new User
			{
				Name = dto.Name,
				Email = dto.Email,
				Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
			};

			return Created("successs", _userRepository.Create(user));
		}

		/*		[HttpPost("login")]
				public IActionResult Login(LoginDto dto)
				{
					var user = _userRepository.GetByEmail(dto.Email);

					if (user == null) return BadRequest(new {message = "Invalid Credentials"});

					if(!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
					{
						return BadRequest(new { message = "Invalid Credentials" });
					}

					var jwt = _jwtService.Generate(user.Id);

					Response.Cookies.Append("jwt", jwt, new CookieOptions(){ Secure = true,HttpOnly = true, SameSite = SameSiteMode.None });

					return Ok(new {message = "success"});

				}*/
		[HttpPost("login")]
		public async Task<IActionResult> Login(LoginDto dto)
		{
			var user = _userRepository.GetByEmail(dto.Email);

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

		[HttpGet("user")]
		public IActionResult User()
		{
			try{
				var jwt = Request.Cookies["jwt"];

				var token = _jwtService.Verify(jwt);

				Guid userId = Guid.Parse(token.Issuer);

				var user = _userRepository.GetUserById(userId);

				return Ok(user);
			}
			catch(Exception e)
			{
				return Unauthorized();
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
