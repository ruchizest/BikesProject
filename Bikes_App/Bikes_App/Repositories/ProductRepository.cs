using Bikes_App.Models;
using Microsoft.EntityFrameworkCore;

namespace Bikes_App.Repositories
{
    public class ProductRepository:DbContext
    {
        public ProductRepository(DbContextOptions<ProductRepository> options)
       : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}
