using Bikes_App.Models;
using Microsoft.EntityFrameworkCore;

namespace Bikes_App.Repositories
{
    public class CustomerRepository : DbContext
    {
        public CustomerRepository(DbContextOptions<CustomerRepository> options)
       : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
    }
}
