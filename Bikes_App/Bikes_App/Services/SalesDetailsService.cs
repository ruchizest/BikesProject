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
            var salesWithDetails = await (from sale in _context.Sales
                                          join product in _context.Products on sale.ProductID equals product.ProductID
                                          join discount in _context.Discounts on sale.ProductID equals discount.ProductID into discountJoin
                                          from activeDiscount in discountJoin.DefaultIfEmpty() // Allow for products without discounts
                                          join salesperson in _context.Salespersons on sale.SalespersonID equals salesperson.SalespersonID
                                          join customer in _context.Customers on sale.CustomerID equals customer.CustomerID
                                          select new SaleDetails
                                          {
                                              SaleID = sale.SaleID,
                                              ProductName = product.Name,
                                              SalespersonName = salesperson.FirstName + " " + salesperson.LastName,
                                              CustomerName = customer.FirstName + " " + customer.LastName,
                                              SaleDate = sale.SaleDate,
                                              SalePrice = CalculateDiscountedPrice(sale.SaleDate, product.SalePrice, activeDiscount),
                                              CommissionPercentage = product.CommissionPercentage
                                          }).ToListAsync();

            return salesWithDetails;
        }

        // Helper method to calculate the discounted price
        private static decimal CalculateDiscountedPrice(DateTime saleDate, decimal salePrice, Discount discount)
        {
            if (discount == null)
            {
                return salePrice; // No discount, return the original sale price
            }

            // Check if the discount is active for the sale date
            if (saleDate >= discount.BeginDate && saleDate <= discount.EndDate)
            {
                // Apply the discount
                var discountedPrice = salePrice * (1 - discount.DiscountPercentage / 100);
                return discountedPrice;
            }
            else
            {
                return salePrice; // Discount is not active, return the original price
            }
        }
    }
}
