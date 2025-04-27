using Bikes_App.Models;
using Microsoft.EntityFrameworkCore;

namespace Bikes_App.Repositories
{
    public class SalesRepository : DbContext
    {
        public SalesRepository(DbContextOptions<SalesRepository> options)
       : base(options)
        {
        }

        public DbSet<Sale> Sales { get; set; }
    }
}
