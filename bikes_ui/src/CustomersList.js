import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomersList = () => {
  const [Customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null); // Track the Customer being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Track whether modal is open
  const [updatedFirstName, setUpdatedFirstName] = useState('');
  const [updatedLastName, setUpdatedLastName] = useState('');
  const [updatedAddress, setUpdatedAddress] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
  const [updatedStartDate, setUpdatedStartDate] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
 
  // Function to fetch Customers from the server
  const fetchCustomers = () => {
    axios.get('http://localhost:5228/api/Customer')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => console.error('Error fetching Customers:', error));
  };

  useEffect(() => {
    fetchCustomers(); // Fetch Customers when the component loads
  }, []);

  const handleEditClick = (Customer) => {
    setEditingCustomer(Customer);
    setUpdatedFirstName(Customer.firstName);
    setUpdatedLastName(Customer.lastName);
    setUpdatedAddress(Customer.address);
    setUpdatedPhone(Customer.phone);
    setUpdatedStartDate(Customer.startDate ? Customer.startDate.substring(0, 10) : '');
    setUpdatedEmail(Customer.email);
    setIsModalOpen(true); // Open modal
  };
  
  const handleUpdateCustomer = () => {
    const updatedCustomer = {
      CustomerID: editingCustomer.customerID,
      FirstName: updatedFirstName,
      LastName: updatedLastName,
      Address: updatedAddress,
      Phone: updatedPhone,
      StartDate: updatedStartDate,
      Email: updatedEmail,
    };
  
    axios.put(`http://localhost:5228/api/Customer/${editingCustomer.customerID}`, updatedCustomer)
      .then(() => {
        fetchCustomers(); // Refetch updated list
        setIsModalOpen(false);
        setEditingCustomer(null);
      })
      .catch(error => console.error('Error updating Customer:', error));
  }; 

  const handleCancelEdit = () => {
    setIsModalOpen(false); // Close modal without saving changes
    setEditingCustomer(null);
  };

  return (
    <div className="Customer-list">
      <h2>Sales List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>StartDate</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {Customers.map(Customer => (
            <tr key={Customer.customerID}>
              <td>{Customer.firstName}</td>
              <td>{Customer.lastName}</td>
              <td>{Customer.address}</td>
              <td>{Customer.phone}</td>
              <td>{Customer.startDate}</td>
              <td>{Customer.email}</td>
              <td>
                <button onClick={() => handleEditClick(Customer)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing Customer */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit First Customer</h3>
            <label>
              First Name:
              <input 
                type="text" 
                value={updatedFirstName} 
                onChange={(e) => setUpdatedFirstName(e.target.value)} 
              />
            </label>
            <label>
              Last Name:
              <input 
                type="text" 
                value={updatedLastName} 
                onChange={(e) => setUpdatedLastName(e.target.value)} 
              />
            </label>
            <label>
              Address:
              <input 
                type="text" 
                value={updatedAddress} 
                onChange={(e) => setUpdatedAddress(e.target.value)} 
              />
            </label>
            <label>
              Phone:
              <input 
                type="text" 
                value={updatedPhone} 
                onChange={(e) => setUpdatedPhone(e.target.value)} 
              />
            </label>
            <label>
              Start Date:
              <input 
                type="date" 
                value={updatedStartDate} 
                onChange={(e) => setUpdatedStartDate(e.target.value)} 
              />
            </label>
            <label>
              Email:
              <input 
                type="text" 
                value={updatedEmail} 
                onChange={(e) => setUpdatedEmail(e.target.value)} 
              />
            </label>
            <div>
              <button onClick={handleUpdateCustomer}>Update</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersList;
