using Bikes_App.Models;
using Bikes_App.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CustomerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerRepository _CustomerRepository;

        public CustomerController(CustomerRepository CustomerRepository)
        {
            _CustomerRepository = CustomerRepository;
        }

        // GET: api/Customer
        [HttpGet]
        public IActionResult GetCustomers()
        {
            return Ok(_CustomerRepository.Customers);
        }

        // GET: api/Customer/{id}
        [HttpGet("{id}")]
        public IActionResult GetCustomer(int id)
        {
            var Customer = _CustomerRepository.Find(typeof(Customer), id);
            if (Customer == null)
            {
                return NotFound();
            }
            return Ok(Customer);
        }

        // PUT: api/Customer/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, [FromBody] Customer updatedCustomer)
        {
            if (id != updatedCustomer.CustomerID)
            {
                return BadRequest();
            }

            var existingCustomer = _CustomerRepository.Find(typeof(Customer), id);
            if (existingCustomer == null)
            {
                return NotFound();
            }

            // Detach the existing Customer (if it's being tracked)
            _CustomerRepository.Entry(existingCustomer).State = EntityState.Detached;

            // Now, attach the updated Customer instance and set the state to Modified
            _CustomerRepository.Update(updatedCustomer); // Mark the new instance as Modified
            await _CustomerRepository.SaveChangesAsync();
            return NoContent();
        }
    }
}
