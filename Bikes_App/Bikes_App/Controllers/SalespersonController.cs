using Bikes_App.Models;
using Bikes_App.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace SalespersonApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalespersonController : ControllerBase
    {
        private readonly SalespersonRepository _salespersonRepository;

        public SalespersonController(SalespersonRepository salespersonRepository)
        {
            _salespersonRepository = salespersonRepository;
        }

        // GET: api/Salesperson
        [HttpGet]
        public IActionResult GetSalespersons()
        {
            return Ok(_salespersonRepository.Salespersons);
        }

        // GET: api/Salesperson/{id}
        [HttpGet("{id}")]
        public IActionResult GetSalesperson(int id)
        {
            var Salesperson = _salespersonRepository.Find(typeof(Salesperson), id);
            if (Salesperson == null)
            {
                return NotFound();
            }
            return Ok(Salesperson);
        }

        // PUT: api/Salesperson/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSalesperson(int id, [FromBody] Salesperson updatedSalesperson)
        {
            if (id != updatedSalesperson.SalespersonID)
            {
                return BadRequest();
            }

            var existingSalesperson = _salespersonRepository.Find(typeof(Salesperson), id);
            if (existingSalesperson == null)
            {
                return NotFound();
            }

            // Detach the existing Salesperson (if it's being tracked)
            _salespersonRepository.Entry(existingSalesperson).State = EntityState.Detached;

            // Now, attach the updated Salesperson instance and set the state to Modified
            _salespersonRepository.Update(updatedSalesperson); // Mark the new instance as Modified
            await _salespersonRepository.SaveChangesAsync();
            return NoContent();
        }
    }
}
