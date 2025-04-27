using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Bikes_App.Models
{
    public class Discount
    {
        public int DiscountID { get; set; }
        public int ProductID { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal DiscountPercentage { get; set; }
    }
}
