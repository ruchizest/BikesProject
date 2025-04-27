using Bikes_App.Models;
using Bikes_App.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace SalesApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly SalesRepository _SalesRepository;

        public SalesController(SalesRepository SalesRepository)
        {
            _SalesRepository = SalesRepository;
        }

        // GET: api/Sales
        [HttpGet]
        public IActionResult GetSales()
        {
            return Ok(_SalesRepository.Sales);
        }

        // GET: api/Sales/{id}
        [HttpGet("{id}")]
        public IActionResult GetSales(int id)
        {
            var Sales = _SalesRepository.Find(typeof(Sale), id);
            if (Sales == null)
            {
                return NotFound();
            }
            return Ok(Sales);
        }

        // PUT: api/Sales/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSales(int id, [FromBody] Sale updatedSales)
        {
            if (id != updatedSales.SaleID)
            {
                return BadRequest();
            }

            var existingSales = _SalesRepository.Find(typeof(Sale), id);
            if (existingSales == null)
            {
                return NotFound();
            }

            // Detach the existing Sales (if it's being tracked)
            _SalesRepository.Entry(existingSales).State = EntityState.Detached;

            // Now, attach the updated Sales instance and set the state to Modified
            _SalesRepository.Update(updatedSales); // Mark the new instance as Modified
            await _SalesRepository.SaveChangesAsync();
            return NoContent();
        }

        // POST: api/Sales/
        [HttpPost]
        public async Task<IActionResult> CreateSale([FromBody] Sale sale)
        {
            await _SalesRepository.AddAsync(sale);
            await _SalesRepository.SaveChangesAsync();

            return Created();
        }
    }
}
