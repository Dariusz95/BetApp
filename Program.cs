using System.Text.Json.Serialization;
using BetApp.Data;
using BetApp.Helpers;
using BetApp.Interfaces;
using BetApp.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Logging;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddControllers();

builder.Services.AddDbContext<BetContext>(options =>
	options.UseNpgsql(connectionString));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IMatchService, MatchService>();
builder.Services.AddScoped<ITeamService, TeamService>();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddHttpContextAccessor();

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowCorsOrigins", builder =>
		builder
			.WithOrigins("http://localhost:3000")
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowCredentials()
			);
});

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
  .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
  {
	  options.Cookie.Name = "jwt";
	  options.LoginPath = "/api/login";
	  options.LogoutPath = "/api/logout";
	  options.SlidingExpiration = true;
	  options.ExpireTimeSpan = new TimeSpan(1, 0, 0);
	  options.Events.OnRedirectToLogin = (context) =>
	  {
		  context.Response.StatusCode = StatusCodes.Status401Unauthorized;
		  return Task.CompletedTask;
	  };
	  options.Cookie.HttpOnly = true;
	  options.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None;
  });

builder.Services.AddControllers().AddJsonOptions(options =>
{
	options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
	options.JsonSerializerOptions.WriteIndented = true;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR(o =>
{
	o.EnableDetailedErrors = true;
});


var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}else{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCookiePolicy(new CookiePolicyOptions
{
	HttpOnly = HttpOnlyPolicy.Always,
	MinimumSameSitePolicy = SameSiteMode.None,
	Secure = CookieSecurePolicy.Always
});

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors("AllowCorsOrigins");

app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
	endpoints.MapControllers();
	endpoints.MapHub<MatchHub>("/matchHub");
});


app.Run();
