using Bikes_App.Models;

namespace Bikes_App.Services
{
    public interface ISalesDetailsService
    {
         Task<List<SaleDetails>> GetSalesWithDetails();
    }
}
