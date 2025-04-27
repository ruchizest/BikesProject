using Bikes_App.Models;
using Bikes_App.Repositories;
using Microsoft.AspNetCore.Mvc;
using Bikes_App.Models;
using Bikes_App.Repositories;
using System;
using Microsoft.EntityFrameworkCore;

namespace ProductApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductRepository _productRepository;

        private readonly ProductContext productContext;

        public ProductController(ProductContext productContext)
        {
            _productRepository = new ProductRepository();
            this.productContext = productContext;
        }

        // GET: api/product
        [HttpGet]
        public IActionResult GetProducts()
        {
            var products = productContext.Products;
            return Ok(products);
        }

        // GET: api/product/{id}
        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = productContext.Find(typeof(Product), id);
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

            var existingProduct = productContext.Find(typeof(Product), id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            // Detach the existing product (if it's being tracked)
            productContext.Entry(existingProduct).State = EntityState.Detached;

            // Now, attach the updated product instance and set the state to Modified
            productContext.Update(updatedProduct); // Mark the new instance as Modified
            await productContext.SaveChangesAsync();
            return NoContent();
        }

       // private readonly ProductContext _context;

        //public ProductsDBController(ProductContext context)
        //{
        //    _context = context;
        //}

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        //{
        //    var products = await _context.Products.ToListAsync();
        //    return Ok(products);
        //}
    }
}
