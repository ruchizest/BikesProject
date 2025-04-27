using Bikes_App.Models;
using Microsoft.EntityFrameworkCore;

namespace Bikes_App.Repositories
{
    public class SalespersonRepository : DbContext
    {
        public SalespersonRepository(DbContextOptions<SalespersonRepository> options)
       : base(options)
        {
        }

        public DbSet<Salesperson> Salespersons { get; set; }
    }
}
