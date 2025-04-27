using Bikes_App.Models;
using Bikes_App.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DiscountsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountsController : ControllerBase
    {
        private readonly DiscountsRepository _DiscountsRepository;

        public DiscountsController(DiscountsRepository DiscountsRepository)
        {
            _DiscountsRepository = DiscountsRepository;
        }

        // GET: api/Discounts
        [HttpGet]
        public IActionResult GetDiscounts()
        {
            return Ok(_DiscountsRepository.Discounts);
        }

        // GET: api/Discounts/{id}
        [HttpGet("{id}")]
        public IActionResult GetDiscounts(int id)
        {
            var Discounts = _DiscountsRepository.Find(typeof(Discount), id);
            if (Discounts == null)
            {
                return NotFound();
            }
            return Ok(Discounts);
        }

        // PUT: api/Discounts/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDiscounts(int id, [FromBody] Discount updatedDiscounts)
        {
            if (id != updatedDiscounts.DiscountID)
            {
                return BadRequest();
            }

            var existingDiscounts = _DiscountsRepository.Find(typeof(Discount), id);
            if (existingDiscounts == null)
            {
                return NotFound();
            }

            // Detach the existing Discounts (if it's being tracked)
            _DiscountsRepository.Entry(existingDiscounts).State = EntityState.Detached;

            // Now, attach the updated Discounts instance and set the state to Modified
            _DiscountsRepository.Update(updatedDiscounts); // Mark the new instance as Modified
            await _DiscountsRepository.SaveChangesAsync();
            return NoContent();
        }

        // POST: api/Discounts/
        [HttpPost]
        public async Task<IActionResult> CreateDiscount([FromBody] Discount Discount)
        {
            await _DiscountsRepository.AddAsync(Discount);
            await _DiscountsRepository.SaveChangesAsync();

            return Created();
        }
    }
}
