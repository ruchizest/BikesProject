using Bikes_App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Bikes_App.Repositories
{
    public class ProductRepository
    {
        //private readonly ProductContext _context;

        //public ProductRepository(ProductContext context)
        //{
        //    _context = context;
        //}

        //public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        //{
        //    var products = await _context.Products.ToListAsync();
        //    return (products);
        //}

        private List<Product> _products = new List<Product>
        {
            new Product { ProductID = 1, Name = "Laptop", PurchasePrice = 1200 },
            new Product { ProductID = 2, Name = "Smartphone", PurchasePrice = 800 },
            new Product { ProductID = 3, Name = "Tablet", PurchasePrice = 400 }
        };

        public IEnumerable<Product> GetAllProducts()
        {
            return _products;
        }

        public Product GetProductById(int id)
        {
            return _products.FirstOrDefault(p => p.ProductID == id);
        }

        public void UpdateProduct(Product product)
        {
            var existingProduct = _products.FirstOrDefault(p => p.ProductID == product.ProductID);
            if (existingProduct != null)
            {
                existingProduct.Name = product.Name;
                existingProduct.PurchasePrice = product.PurchasePrice;
            }
        }
    }
}
