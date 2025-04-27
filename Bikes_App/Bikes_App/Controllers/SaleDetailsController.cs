using Bikes_App.Services;
using Microsoft.AspNetCore.Mvc;

namespace SalesApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleDetailsController : ControllerBase
    {
        private readonly SalesDetailsService _salesService;

        public SaleDetailsController(SalesDetailsService salesService)
        {
            _salesService = salesService;
        }

        // GET: api/SaleDetails
        [HttpGet]
        public async Task<IActionResult> GetSales()
        {
            return Ok(await _salesService.GetSalesWithDetails());
        }
    }
}
