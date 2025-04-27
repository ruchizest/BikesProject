import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SaleDetailsList = () => {
  const [SaleDetails, setSaleDetails] = useState([]);
  const [filteredSaleDetails, setFilteredSaleDetails] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedRange, setSelectedRange] = useState('');

  // Function to fetch SaleDetails from the server
  const fetchSaleDetails = () => {
    axios
      .get('http://localhost:5228/api/SaleDetails')
      .then((response) => {
        setSaleDetails(response.data);
        setFilteredSaleDetails(response.data); // Initially show all details
      })
      .catch((error) => console.error('Error fetching SaleDetails:', error));
  };

  useEffect(() => {
    fetchSaleDetails(); // Fetch SaleDetails when the component loads
  }, []);

  // Function to filter SaleDetails by date range
  const filterByDateRange = () => {
    let start, end;

    switch (selectedRange) {
      case 'Today':
        start = new Date();
        start.setDate(start.getDate() - 1);
        end = new Date();
        break;
      case 'Last Week':
        start = new Date();
        start.setDate(start.getDate() - 7); // 1 week ago
        end = new Date();
        break;
      case 'Last Month':
        start = new Date();
        start.setMonth(start.getMonth() - 1); // 1 month ago
        end = new Date();
        break;
      case 'Last Year':
          start = new Date();
          start.setMonth(start.getMonth() - 12); // 1 year
          end = new Date();
          break;
      case 'Custom':
        // Use the selected start and end date
        if (!startDate || !endDate) return; // If no custom date range is selected, do nothing
        start = new Date(startDate);
        end = new Date(endDate);
        break;
      default:
        return; // No filtering
    }

    // Filter SaleDetails by the selected date range
    const filtered = SaleDetails.filter((sale) => {
      const saleDate = new Date(sale.saleDate);
      return saleDate >= start && saleDate <= end;
    });
    setFilteredSaleDetails(filtered);
  };

  // Trigger filtering when selected range, start or end date changes
  useEffect(() => {
    filterByDateRange();
  }, [selectedRange, startDate, endDate]);

  return (
    <div className="SaleDetail-list">
      <h2>Sale Details</h2>

      {/* Date Range Filter */}
      <div className="filter">
        <label>
          Sale Date :
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
          >
            <option value="">Select Range</option>
            <option value="Today">Today</option>
            <option value="Last Week">Last Week</option>
            <option value="Last Month">Last Month</option>
            <option value="Last Year">Last Year</option>
            <option value="Custom">Custom Date Range</option>
          </select>
        </label>

        {/* Custom Date Range (shown when "Custom" is selected) */}
        {selectedRange === 'Custom' && (
          <div>
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
          </div>
        )}
      </div>

      {/* Table displaying filtered SaleDetails */}
      <table>
        <thead>
          <tr>
            <th>Sale Date</th>
            <th>Product Name</th>
            <th>Customer Name</th>
            <th>Sales Person Name</th>
            <th>Sale Price</th>
            <th>Commision Percentage</th>
          </tr>
        </thead>
        <tbody>
          {filteredSaleDetails.map((SaleDetail) => (
            <tr key={SaleDetail.saleID}>
              <td>{SaleDetail.saleDate}</td>
              <td>{SaleDetail.productName}</td>
              <td>{SaleDetail.customerName}</td>
              <td>{SaleDetail.salespersonName}</td>
              <td>${SaleDetail.salePrice}</td>
              <td>{SaleDetail.commissionPercentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaleDetailsList;