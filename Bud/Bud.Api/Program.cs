using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

builder.Services.AddControllers();
builder.Services.AddScoped<NewUserService>();
builder.Services.AddSingleton<DbConnectionFactory>();
builder.Services.AddScoped<WorkoutService>();
builder.Services.AddScoped<ExerciseService>();


//autorization
builder.Services.AddAuthorization();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["Authentication:Authority"];
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Authentication:ValidIssuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Authentication:ValidAudience"]
        };
    });

var app = builder.Build();

app.UseRouting();
app.UseCors("AllowReact");
app.UseAuthentication();
app.UseAuthorization();

// useful test endpoint to check if auth is working
app.MapGet("/user", (ClaimsPrincipal principal) =>
{
    var claims = principal.Claims.ToDictionary(c => c.Type, c => c.Value);
    return Results.Ok(claims);
}).RequireAuthorization();


app.MapControllers();
app.MapGet("/hello", () => "Hello from ASP.NET!");

app.Run();

