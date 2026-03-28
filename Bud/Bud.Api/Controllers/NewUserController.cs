using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class NewUserController : ControllerBase
{
    private readonly NewUserService _NewUserService;

    public NewUserController(NewUserService newUserService)
    {
        _NewUserService = newUserService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_NewUserService.GetAll());
    }
}