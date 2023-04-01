using BetApp.Data;
using BetApp.Helpers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Logging;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services
	.AddDbContext<UserContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUserRepository, UserRepository>();
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
});

app.Run();
