using Bikes_App.Models;
using Bikes_App.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ProductApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private readonly ProductRepository productRepository;

        public ProductController(ProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }

        // GET: api/product
        [HttpGet]
        public IActionResult GetProducts()
        {
            var products = productRepository.Products;
            return Ok(products);
        }

        // GET: api/product/{id}
        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = productRepository.Find(typeof(Product), id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // PUT: api/product/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product updatedProduct)
        {
            if (id != updatedProduct.ProductID)
            {
                return BadRequest();
            }

            var existingProduct = productRepository.Find(typeof(Product), id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            // Detach the existing product (if it's being tracked)
            productRepository.Entry(existingProduct).State = EntityState.Detached;

            // Now, attach the updated product instance and set the state to Modified
            productRepository.Update(updatedProduct); // Mark the new instance as Modified
            await productRepository.SaveChangesAsync();
            return NoContent();
        }
    }
}
