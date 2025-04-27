using System.Runtime.ConstrainedExecution;
using Bikes_App.Models;
using Bikes_App.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Bikes_App.Services
{
    public class SalesDetailsService
    {
        private readonly SalesDetailsRepository _context;

        public SalesDetailsService(SalesDetailsRepository context)
        {
            _context = context;
        }

        public async Task<List<SaleDetails>> GetSalesWithDetails()
        {
            // Use a single context to query the data
            // Use Eager loading
            var salesWithDetails = await _context.Sales
               .Include(sale => sale.Product)
               .Include(sale => sale.Salesperson)
               .Include(sale => sale.Customer)
               .Select(sale => new SaleDetails
               {
                   SaleID = sale.SaleID,
                   ProductName = sale.Product.Name,
                   SalespersonName = sale.Salesperson.FirstName + " " + sale.Salesperson.LastName,
                   CustomerName = sale.Customer.FirstName + " " + sale.Customer.LastName,
                   SaleDate = sale.SaleDate,
                   SalePrice = sale.Product.SalePrice,
                   CommissionPercentage = sale.Product.CommissionPercentage
               })
              .ToListAsync();

            return salesWithDetails;
        }
    }
}
