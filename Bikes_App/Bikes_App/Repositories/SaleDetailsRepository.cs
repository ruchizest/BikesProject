using Bikes_App.Models;
using Microsoft.EntityFrameworkCore;

namespace Bikes_App.Repositories
{
    public class SalesDetailsRepository : DbContext
    {
        public SalesDetailsRepository(DbContextOptions<SalesDetailsRepository> options)
       : base(options)
        {
        }

        public DbSet<Sale> Sales { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Salesperson> Salespersons { get; set; }
    }
}
