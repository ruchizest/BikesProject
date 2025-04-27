import React, { useState, useEffect } from 'react';
import './App.css';
import ProductList from './ProductList';
import SalesPersonsList from './SalesPersonsList';
import CustomersList from './CustomersList';
import SaleDetailsList from './SaleDetailsList';

const App = () => {
  const [activeTab, setActiveTab] = useState('products'); // Default active tab is 'products'

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductList />;
      case 'salespersons':
          return <SalesPersonsList />;
      case 'customers':
         return <CustomersList />;
      case 'sales':
        return <SaleDetailsList />;
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
        <button 
          className={activeTab === 'products' ? 'active' : ''} 
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button 
          className={activeTab === 'salespersons' ? 'active' : ''} 
          onClick={() => setActiveTab('salespersons')}
        >
          Salespersons
        </button>
        <button 
          className={activeTab === 'customers' ? 'active' : ''} 
          onClick={() => setActiveTab('customers')}
        >
          Customers
        </button>
        <button 
          className={activeTab === 'sales' ? 'active' : ''} 
          onClick={() => setActiveTab('sales')}
        >
          Sales
        </button>
      </div>

      {/* Render the content based on the active tab */}
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default App;
