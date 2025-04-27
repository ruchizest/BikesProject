import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited
  const [updatedName, setUpdatedName] = useState('');
  const [updatedManufacturer, setUpdatedManufacturer] = useState('');
  const [updatedStyle, setUpdatedStyle] = useState('');
  const [updatedSalePrice, setUpdatedSalePrice] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Track whether modal is open

  // useEffect(() => {
  //   axios.get('http://localhost:5228/api/product')
  //     .then(response => {
  //       setProducts(response.data);
  //     })
  //     .catch(error => console.error('Error fetching products:', error));
  // }, []);

  
  // Function to fetch products from the server
  const fetchProducts = () => {
    axios.get('http://localhost:5228/api/product')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component loads
  }, []);

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setUpdatedName(product.name);
    setUpdatedManufacturer(product.manufacturer);
    setUpdatedStyle(product.style);
    setUpdatedSalePrice(product.salePrice);
    setIsModalOpen(true); // Open modal when Edit button is clicked
  };

  const handleUpdateProduct = () => {
    const updatedProduct = {
      ProductID: editingProduct.productID,
      Name: updatedName,
      Manufacturer: updatedManufacturer,
      Style: updatedStyle,
      SalePrice: parseFloat(updatedSalePrice),
    };

    axios.put(`http://localhost:5228/api/product/${editingProduct.productID}`, updatedProduct)
      .then(() => {
        //setProducts(products.map(p => (p.productID === editingProduct.productID ? updatedProduct : p)));
        fetchProducts();
        setIsModalOpen(false); // Close modal after update
        setEditingProduct(null); // Reset editing state
      })
      .catch(error => console.error('Error updating product:', error));
  };

  const handleCancelEdit = () => {
    setIsModalOpen(false); // Close modal without saving changes
    setEditingProduct(null);
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.productID}>
              <td>{product.name}</td>
              <td>{product.manufacturer}</td>
              <td>{product.style}</td>
              <td>${product.salePrice}</td>
              <td>
                <button onClick={() => handleEditClick(product)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
            <div>
              <button onClick={handleUpdateProduct}>Update</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
