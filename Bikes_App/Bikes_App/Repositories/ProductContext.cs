using Bikes_App.Models;
using Microsoft.EntityFrameworkCore;

namespace Bikes_App.Repositories
{
    public class ProductContext:DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options)
       : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}
