using BetApp.Data;
using BetApp.Helpers;
using BetApp.Interfaces;
using BetApp.Services;
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
// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddDbContext<UserContext>(options =>
	options.UseNpgsql(connectionString));
builder.Services.AddDbContext<TeamContext>(options =>
	options.UseNpgsql(connectionString));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IMatchService, MatchService>();
builder.Services.AddScoped<ITeamService, TeamService>();
builder.Services.AddScoped<JwtService>();

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

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR(o =>
{
	o.EnableDetailedErrors = true;
});


var app = builder.Build();

// Configure the HTTP request pipeline.
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
