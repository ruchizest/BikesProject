import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reports = () => {
  const [commissionData, setCommissionData] = useState({});
  const [allQuarters, setAllQuarters] = useState([]); // Store unique quarters
  const [selectedQuarter, setSelectedQuarter] = useState(''); // Selected quarter
  const [sortConfig, setSortConfig] = useState({ key: 'totalCommission', direction: 'desc' });

  useEffect(() => {
    fetchSaleDetails();
  }, []);

  const fetchSaleDetails = () => {
    axios
      .get('http://localhost:5228/api/SaleDetails')
      .then((response) => {
        calculateCommissions(response.data);
      })
      .catch((error) => console.error('Error fetching SaleDetails:', error));
  };

  const calculateCommissions = (sales) => {
    const commissions = {};
    const quartersSet = new Set(); // To collect unique quarters

    sales.forEach((sale) => {
      const salespersonName = sale.salespersonName;
      const saleDate = new Date(sale.saleDate);
      const year = saleDate.getFullYear();
      const month = saleDate.getMonth(); // 0-indexed: 0=Jan, 11=Dec
      const quarter = `Q${Math.floor(month / 3) + 1} ${year}`;

      quartersSet.add(quarter);

      const commissionEarned = (sale.salePrice * sale.commissionPercentage) / 100;

      if (!commissions[salespersonName]) {
        commissions[salespersonName] = {};
      }

      if (!commissions[salespersonName][quarter]) {
        commissions[salespersonName][quarter] = 0;
      }

      commissions[salespersonName][quarter] += commissionEarned;
    });

    setCommissionData(commissions);
    setAllQuarters(Array.from(quartersSet).sort()); // Save all unique quarters sorted
  };

  const handleQuarterChange = (e) => {
    setSelectedQuarter(e.target.value);
  };

  const handleSort = (columnKey) => {
    let direction = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key: columnKey, direction });
  };

  const sortedData = () => {
    let sorted = [];
    Object.entries(commissionData).forEach(([salesperson, quarters]) => {
      Object.entries(quarters).forEach(([quarter, totalCommission]) => {
        sorted.push({ salesperson, quarter, totalCommission });
      });
    });

    const { key, direction } = sortConfig;

    return sorted.sort((a, b) => {
      if (direction === 'asc') {
        return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
      } else {
        return a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0;
      }
    });
  };

  return (
    <div className="commission-report">
      <h2>Quarterly Commission Report</h2>

      {/* Quarter Filter Dropdown */}
      <div className="filter">
        <label>
          Filter by Quarter:{' '}
          <select value={selectedQuarter} onChange={handleQuarterChange}>
            <option value="">All Quarters</option>
            {allQuarters.map((quarter) => (
              <option key={quarter} value={quarter}>
                {quarter}
              </option>
            ))}
          </select>
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('salesperson')}>
              Salesperson Name
              {sortConfig.key === 'salesperson' && (
                <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </th>
            <th onClick={() => handleSort('quarter')}>
              Quarter
              {sortConfig.key === 'quarter' && (
                <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </th>
            <th onClick={() => handleSort('totalCommission')}>
              Total Commission Earned
              {sortConfig.key === 'totalCommission' && (
                <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData()
            .filter(
              ({ quarter }) => selectedQuarter === '' || quarter === selectedQuarter
            )
            .map(({ salesperson, quarter, totalCommission }) => (
              <tr key={`${salesperson}-${quarter}`}>
                <td>{salesperson}</td>
                <td>{quarter}</td>
                <td>${totalCommission.toFixed(2)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;