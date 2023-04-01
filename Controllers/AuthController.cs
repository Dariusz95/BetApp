using System.Net;
using betApp.Models;
using BetApp.Data;
using BetApp.Dtos;
using BetApp.Helpers;
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

		[HttpPost("login")]
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
		}

		[HttpGet("user")]
		public IActionResult User()
		{
			try{
				var jwt = Request.Cookies["jwt"];

				var token = _jwtService.Verify(jwt);

				int userId = int.Parse(token.Issuer);

				var user = _userRepository.GetById(userId);

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

	}
}
