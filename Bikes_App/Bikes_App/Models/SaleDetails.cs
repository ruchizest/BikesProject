namespace Bikes_App.Models
{
    public class SaleDetails
    {
        public int SaleID { get; set; }
        public string ProductName { get; set; }
        public string SalespersonName { get; set; }
        public string CustomerName { get; set; }
        public DateTime SaleDate { get; set; }
        public decimal SalePrice { get; set; }
        public decimal CommissionPercentage { get; set; }
    }
}
