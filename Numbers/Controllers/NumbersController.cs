using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Numbers.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NumbersController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<NumbersController> _logger;

    public NumbersController(ApplicationDbContext context, ILogger<NumbersController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet("GetData", Name = "GetData")]
    public async Task<IActionResult> GetData()
    {
        try
        {
            var data = await _context.YourEntities.ToListAsync();
            var output = data.ToString();

            if (data.Count() == 0)
            {
                return StatusCode(204, "No content");
            }
            return Ok(data); // Return a 200 OK response with the data
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while retrieving data.");
            return StatusCode(500, "Internal Server Error"); // Return a 500 Internal Server Error response
        }
    }
}
