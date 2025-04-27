using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Bikes_App.Models
{
    public class Sale
    {
        public int SaleID { get; set; }
        public int ProductID { get; set; }
        public int SalespersonID { get; set; }
        public int CustomerID { get; set; }
        public DateTime SaleDate { get; set; }
    }
}
