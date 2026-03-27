var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});


var app = builder.Build();

app.UseCors("AllowReact"); // ✅ Don't forget this — registers the policy isn't enough

app.MapGet("/hello", () => "Hello from ASP.NET!");

app.Run();

