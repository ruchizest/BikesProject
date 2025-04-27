using Bikes_App.Models;
using Microsoft.EntityFrameworkCore;

namespace Bikes_App.Models
{
    public class Salesperson
    {
        public int SalespersonID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime TerminationDate { get; set; } = DateTime.MaxValue;
        public string Manager { get; set; }
    }
}
