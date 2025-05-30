import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ setActiveTab }) => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedManufacturer, setUpdatedManufacturer] = useState('');
  const [updatedStyle, setUpdatedStyle] = useState('');
  const [updatedSalePrice, setUpdatedSalePrice] = useState('');
  const [updatedQtyOnHand, setUpdatedQtyOnHand] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState({});
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [salespersonSearch, setSalespersonSearch] = useState('');
  const [selectedSalesperson, setSelectedSalesperson] = useState(null);
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');

  const fetchProducts = () => {
    axios.get('http://localhost:5228/api/product')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  };

  const fetchCustomers = () => {
    axios.get('http://localhost:5228/api/Customer')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching Customers:', error));
  };

  const fetchSalespersons = () => {
    axios.get('http://localhost:5228/api/Salesperson')
      .then(response => setSalespersons(response.data))
      .catch(error => console.error('Error fetching Salespersons:', error));
  };

  const fetchDiscounts = () => {
    axios.get('http://localhost:5228/api/Discounts')
      .then(response => setDiscounts(response.data))
      .catch(error => console.error('Error fetching Discounts:', error));
  };

  // Check if the discount is active based on the current date
  const getDiscountedPrice = (productID, salePrice) => {
    const today = new Date();
    const activeDiscount = discounts.find(discount =>
      discount.productID === productID &&
      new Date(discount.beginDate) <= today &&
      new Date(discount.endDate) >= today
    );

    if (activeDiscount) {
      const discountedPrice = salePrice * (1 - activeDiscount.discountPercentage / 100);
      return {
        discountedPrice: discountedPrice.toFixed(2),
        discountPercentage: activeDiscount.discountPercentage,
      };
    }
    // No active discount
    return {
      discountedPrice: salePrice,
      discountPercentage: 0,
    };
  };


  useEffect(() => {
    fetchProducts();
    fetchCustomers();
    fetchSalespersons();
    fetchDiscounts();
  }, []);

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setUpdatedName(product.name);
    setUpdatedManufacturer(product.manufacturer);
    setUpdatedStyle(product.style);
    setUpdatedSalePrice(product.salePrice);
    setUpdatedQtyOnHand(product.qtyOnHand);
    setIsModalOpen(true);
  };


  const handleUpdateProduct = () => {
    const updatedProduct = {
      ProductID: editingProduct.productID,
      Name: updatedName,
      Manufacturer: updatedManufacturer,
      Style: updatedStyle,
      SalePrice: parseFloat(updatedSalePrice),
      QtyOnHand : updatedQtyOnHand
    };

    axios.put(`http://localhost:5228/api/product/${editingProduct.productID}`, updatedProduct)
      .then(() => {
        fetchProducts();
        setIsModalOpen(false);
        setEditingProduct(null);
      })
      .catch(error => {
        console.error('Error updating product:', error);
        alert(error.message);
      });
  };

  const handleCancelEdit = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleAddItem = (productID) => {
    setCart(prev => ({ ...prev, [productID]: 1 }));
  };

  const handleIncrease = (productID) => {
    setCart(prev => ({ ...prev, [productID]: (prev[productID] || 0) + 1 }));
  };

  const handleDecrease = (productID) => {
    setCart(prev => {
      const newQuantity = (prev[productID] || 0) - 1;
      if (newQuantity <= 0) {
        const { [productID]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productID]: newQuantity };
    });
  };

  const handleCheckout = async () => {
    if (!selectedCustomer || !selectedSalesperson) {
      alert('Please select both a customer and salesperson before Create Sale.');
      return;
    }
  
    try {
      for (const productID in cart) {
        const quantity = cart[productID];
  
        // 1. Create a Sale for each quantity of the product
        for (let i = 0; i < quantity; i++) {
          const sale = {
            productID: parseInt(productID),
            salespersonID: selectedSalesperson.salespersonID,
            customerID: selectedCustomer.customerID,
            saleDate: new Date().toISOString() // current date
          };
  
          await axios.post('http://localhost:5228/api/Sales', sale);
        }
  
        // 2. Update the Product QtyOnHand
        const product = products.find(p => p.productID === parseInt(productID));
        if (product) {
          const updatedProduct = {
            ...product,
            qtyOnHand: product.qtyOnHand - quantity
          };
  
          await axios.put(`http://localhost:5228/api/product/${productID}`, updatedProduct);
        }
      }
  
      setCart({});
      fetchProducts(); // refresh products to show updated QtyOnHand
      // After Create Sale success, move to Sales tab
      setActiveTab('sales');
    } catch (error) {
      console.error('Error during Create Sale:', error);
      alert('There was an error processing the Create Sale.');
    }
  };  

  const filteredCustomers = customers.filter(customer =>
    customer.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
    customer.phone.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const filteredSalespersons = salespersons.filter(person =>
    (person.firstName + ' ' + person.lastName).toLowerCase().includes(salespersonSearch.toLowerCase()) ||
    person.phone.toLowerCase().includes(salespersonSearch.toLowerCase())
  );

  const handleCreateCustomer = () => {
    const newCustomer = {
      FirstName: "New",
      LastName: "Customer",
      Email: newCustomerEmail,
      Phone: newCustomerPhone,
    };

    axios.post('http://localhost:5228/api/Customer', newCustomer)
      .then(response => {
        setCustomers(prev => [...prev, response.data]);
        setSelectedCustomer(response.data);
        setCustomerSearch('');
        setNewCustomerEmail('');
        setNewCustomerPhone('');
      })
      .catch(error => console.error('Error creating customer:', error));
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Style</th>
            <th>Sale Price</th>
            <th>Discounted Price</th>
            <th>Available Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(product => {
              const discount = getDiscountedPrice(product.productID, product.salePrice);
              return (
                <tr key={product.productID}>
                  <td>{product.name}</td>
                  <td>{product.manufacturer}</td>
                  <td>{product.style}</td>
                  <td>${product.salePrice}</td>
                  <td>
                  {  
                    <>
                      ${discount.discountedPrice} <span>({discount.discountPercentage}% off)</span>
                    </>
                  }
                </td>
                  <td>{product.qtyOnHand}</td>
                  <td>
                    <button onClick={() => handleEditClick(product)}>Edit</button>
                    {cart[product.productID] ? (
                      <span style={{ marginLeft: '8px' }}>
                        <button onClick={() => handleDecrease(product.productID)}>-</button>
                        <span style={{ margin: '0 5px' }}>{cart[product.productID]}</span>
                        <button onClick={() => handleIncrease(product.productID)}>+</button>
                      </span>
                    ) : (
                      <button onClick={() => handleAddItem(product.productID)} style={{ marginLeft: '8px' }} disabled = {product.qtyOnHand<=0}>
                        Buy
                      </button>
                    )}                   
                  </td>
                </tr>
            )})           
          }
        </tbody>
      </table>

      {/* Create Sale Section */}
      {Object.keys(cart).length > 0 && (
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Customer Search */}
          <div>
            <input
              type="text"
              placeholder="Search Customer (Phone/Email)"
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              style={{ padding: '8px', width: '300px' }}
            />
            {customerSearch && (
              <div style={{ background: '#f9f9f9', border: '1px solid #ccc', marginTop: '5px', maxHeight: '150px', overflowY: 'auto' }}>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map(customer => (
                    <div
                      key={customer.customerID}
                      style={{ padding: '8px', cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setCustomerSearch('');
                      }}
                    >
                      {customer.email} ({customer.phone})
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '8px' }}>
                    <div>No customer found. Create new:</div>
                    <input
                      type="text"
                      placeholder="Email"
                      value={newCustomerEmail}
                      onChange={(e) => setNewCustomerEmail(e.target.value)}
                      style={{ marginTop: '5px', width: '90%' }}
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={newCustomerPhone}
                      onChange={(e) => setNewCustomerPhone(e.target.value)}
                      style={{ marginTop: '5px', width: '90%' }}
                    />
                    <button onClick={handleCreateCustomer} style={{ marginTop: '8px' }}>
                      Create Customer
                    </button>
                  </div>
                )}
              </div>
            )}
            {selectedCustomer && (
              <div style={{ marginTop: '5px', color: 'green' }}>
                Selected Customer: {selectedCustomer.email} ({selectedCustomer.phone})
              </div>
            )}
          </div>

          {/* Salesperson Search */}
          <div>
            <input
              type="text"
              placeholder="Search Salesperson (Name/Phone)"
              value={salespersonSearch}
              onChange={(e) => setSalespersonSearch(e.target.value)}
              style={{ padding: '8px', width: '300px' }}
            />
            {salespersonSearch && (
              <div style={{ background: '#f9f9f9', border: '1px solid #ccc', marginTop: '5px', maxHeight: '150px', overflowY: 'auto' }}>
                {filteredSalespersons.length > 0 ? (
                  filteredSalespersons.map(person => (
                    <div
                      key={person.salespersonID}
                      style={{ padding: '8px', cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedSalesperson(person);
                        setSalespersonSearch('');
                      }}
                    >
                      {person.firstName} {person.lastName} ({person.phone})
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '8px' }}>No salesperson found.</div>
                )}
              </div>
            )}
            {selectedSalesperson && (
              <div style={{ marginTop: '5px', color: 'blue' }}>
                Selected Salesperson: {selectedSalesperson.firstName} {selectedSalesperson.lastName}
              </div>
            )}
          </div>

          {/* Create Sale Button */}
          <button
            onClick={handleCheckout}
            style={{ padding: '10px 30px', fontSize: '1.2rem' }}
            disabled={!selectedCustomer || !selectedSalesperson}
          >
            Create Sale
          </button>
        </div>
      )}

      {/* Modal for editing product */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Product</h3>
            <label>
              Name:
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </label>
            <label>
              Manufacturer:
              <input
                type="text"
                value={updatedManufacturer}
                onChange={(e) => setUpdatedManufacturer(e.target.value)}
              />
            </label>
            <label>
              Style:
              <input
                type="text"
                value={updatedStyle}
                onChange={(e) => setUpdatedStyle(e.target.value)}
              />
            </label>
            <label>
              Sale Price:
              <input
                type="number"
                value={updatedSalePrice}
                onChange={(e) => setUpdatedSalePrice(e.target.value)}
              />
            </label>
            <label>
              Quantity Available:
              <input
                type="number"
                value={updatedQtyOnHand}
                onChange={(e) => setUpdatedQtyOnHand(e.target.value)}
              />
            </label>
            <div style={{ marginTop: '10px' }}>
              <button onClick={handleUpdateProduct}>Update</button>
              <button onClick={handleCancelEdit} style={{ marginLeft: '8px' }}>Cancel</button>
            </div>
          </div>
        </div>
        
      )}
    
    </div>
  );
};

export default ProductList;