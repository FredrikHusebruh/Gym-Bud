using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class ExerciseController : ControllerBase
{
    private readonly ExerciseService _exerciseService;
    private readonly ILogger<ExerciseController> _logger;

    public ExerciseController(ExerciseService exerciseService, ILogger<ExerciseController> logger)
    {
        _exerciseService = exerciseService;
        _logger = logger;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateExercise([FromBody] CreateExerciseRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Exercise name is required");

        var userId = GetUserIdFromJwt();
        if (userId == null) return Unauthorized();

        try
        {
            var result = await _exerciseService.CreateExerciseAsync(request, userId.Value);
            if (result == null) return Forbid();
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create exercise for user {UserId}", userId);
            return StatusCode(500, "Failed to create exercise");
        }
    }

    [HttpGet("musclegroup")]
    public async Task<IActionResult> GetMuscleGroups()
    {
        try
        {
            var groups = await _exerciseService.GetMuscleGroupsAsync();
            return Ok(groups);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch muscle groups");
            return StatusCode(500, "Failed to fetch muscle groups");
        }
    }

    private Guid? GetUserIdFromJwt()
    {
        var sub = User.FindFirstValue(ClaimTypes.NameIdentifier)
                  ?? User.FindFirstValue("sub");
        return Guid.TryParse(sub, out var id) ? id : null;
    }
}
