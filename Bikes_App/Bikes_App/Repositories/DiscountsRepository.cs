using Bikes_App.Models;
using Microsoft.EntityFrameworkCore;

namespace Bikes_App.Repositories
{
    public class DiscountsRepository : DbContext
    {
        public DiscountsRepository(DbContextOptions<DiscountsRepository> options)
       : base(options)
        {
           
        }

        public DbSet<Discount> Discounts { get; set; }

    }
}
