using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class WorkoutController : ControllerBase
{
    private readonly WorkoutService _workoutService;
    private readonly ILogger<WorkoutController> _logger;

    public WorkoutController(WorkoutService workoutService, ILogger<WorkoutController> logger)
    {
        _workoutService = workoutService;
        _logger = logger;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateWorkout([FromBody] CreateWorkoutRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Workout name is required");

        var userId = GetUserIdFromJwt();
        if (userId == null) return Unauthorized();

        try
        {
            var result = await _workoutService.CreateWorkoutAsync(request, userId.Value);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create workout for user {UserId}", userId);
            return StatusCode(500, "Failed to create workout");
        }
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetWorkouts()
    {
        var userId = GetUserIdFromJwt();
        if (userId == null) return Unauthorized();

        try
        {
            var workouts = await _workoutService.GetWorkoutsAsync(userId.Value);
            return Ok(workouts);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch workouts for user {UserId}", userId);
            return StatusCode(500, "Failed to fetch workouts");
        }
    }

    [Authorize]
    [HttpPost("start")]
    public async Task<IActionResult> StartWorkout([FromBody] StartWorkoutRequest request)
    {
        var userId = GetUserIdFromJwt();
        if (userId == null) return Unauthorized();

        try
        {
            var result = await _workoutService.StartWorkoutAsync(request.TemplateId, userId.Value);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to start workout for user {UserId}", userId);
            return StatusCode(500, "Failed to start workout");
        }
    }

    [Authorize]
    [HttpPost("set")]
    public async Task<IActionResult> LogSet([FromBody] LogSetRequest request)
    {
        var userId = GetUserIdFromJwt();
        if (userId == null) return Unauthorized();

        try
        {
            var result = await _workoutService.LogSetAsync(request, userId.Value);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to log set for user {UserId}", userId);
            return StatusCode(500, "Failed to log set");
        }
    }

    [Authorize]
    [HttpGet("template/{templateId}/last")]
    public async Task<IActionResult> GetLastWorkoutSets(long templateId, [FromQuery] long excludeWorkoutId)
    {
        var userId = GetUserIdFromJwt();
        if (userId == null) return Unauthorized();

        try
        {
            var result = await _workoutService.GetLastWorkoutSetsAsync(templateId, userId.Value, excludeWorkoutId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch last workout sets for user {UserId}", userId);
            return StatusCode(500, "Failed to fetch last workout sets");
        }
    }

    [HttpGet("category")]
    public async Task<IActionResult> GetCategories()
    {
        try
        {
            var categories = await _workoutService.GetCategoriesAsync();
            return Ok(categories);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch categories");
            return StatusCode(500, "Failed to fetch categories");
        }
    }

    private Guid? GetUserIdFromJwt()
    {
        var sub = User.FindFirstValue(ClaimTypes.NameIdentifier)
                  ?? User.FindFirstValue("sub");
        return Guid.TryParse(sub, out var id) ? id : null;
    }
}
