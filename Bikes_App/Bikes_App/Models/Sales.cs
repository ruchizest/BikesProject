namespace Bikes_App.Models
{
    public class Sale
    {
        public int SaleID { get; set; }
        public int ProductID { get; set; }
        public int SalespersonID { get; set; }
        public int CustomerID { get; set; }
        public DateTime SaleDate { get; set; }

        // Navigation properties for join
        public virtual Product Product { get; set; }
        public virtual Salesperson Salesperson { get; set; }
        public virtual Customer Customer { get; set; }
    }
}
