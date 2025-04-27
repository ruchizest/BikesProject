import React, { useState, useEffect } from 'react';
import './App.css';
import ProductList from './ProductList';
import SalesList from './SalesList';


// function App() {
//   return (
//     <div className="App">
//       <h1>Product Management</h1>
//       <ProductList />
//     </div>
//   );
// }

// export default App;

const App = () => {
  const [activeTab, setActiveTab] = useState('products'); // Default active tab is 'products'

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductList />;
      // case 'customers':
      //   return <CustomersTab />;
      case 'sales':
        return <SalesList />;
      // case 'salespersons':
      //   return <SalesPersonsTab />;
      default:
        return <ProductList />;
    }
  };

  return (
    <div className="App">
      <h1>
        <img src="/logo.png" alt="BeSpoked Bikes Logo" className="logo" />
        BeSpoked Bikes
      </h1>

      {/* Tab navigation */}
      <div className="tabs">
        <button onClick={() => setActiveTab('products')}>Products</button>
        <button onClick={() => setActiveTab('customers')}>Customers</button>
        <button onClick={() => setActiveTab('sales')}>Sales</button>
        <button onClick={() => setActiveTab('salespersons')}>Salespersons</button>
      </div>

      {/* Render the content based on the active tab */}
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default App;
