import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesPersonsList = () => {
  const [Salespersons, setSalespersons] = useState([]);
  const [editingSalesperson, setEditingSalesperson] = useState(null); // Track the Salesperson being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Track whether modal is open
  const [updatedFirstName, setUpdatedFirstName] = useState('');
  const [updatedLastName, setUpdatedLastName] = useState('');
  const [updatedAddress, setUpdatedAddress] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
  const [updatedStartDate, setUpdatedStartDate] = useState('');
  const [updatedManager, setUpdatedManager] = useState('');
 
  // Function to fetch Salespersons from the server
  const fetchSalespersons = () => {
    axios.get('http://localhost:5228/api/Salesperson')
      .then(response => {
        setSalespersons(response.data);
      })
      .catch(error => console.error('Error fetching Salespersons:', error));
  };

  useEffect(() => {
    fetchSalespersons(); // Fetch Salespersons when the component loads
  }, []);

  const handleEditClick = (Salesperson) => {
    setEditingSalesperson(Salesperson);
    setUpdatedFirstName(Salesperson.firstName);
    setUpdatedLastName(Salesperson.lastName);
    setUpdatedAddress(Salesperson.address);
    setUpdatedPhone(Salesperson.phone);
    setUpdatedStartDate(Salesperson.startDate ? Salesperson.startDate.substring(0, 10) : '');
    setUpdatedManager(Salesperson.manager);
    setIsModalOpen(true); // Open modal
  };
  
  const handleUpdateSalesperson = () => {
    const updatedSalesperson = {
      SalespersonID: editingSalesperson.salespersonID,
      FirstName: updatedFirstName,
      LastName: updatedLastName,
      Address: updatedAddress,
      Phone: updatedPhone,
      StartDate: updatedStartDate,
      Manager: updatedManager,
    };
  
    axios.put(`http://localhost:5228/api/Salesperson/${editingSalesperson.salespersonID}`, updatedSalesperson)
      .then(() => {
        fetchSalespersons(); // Refetch updated list
        setIsModalOpen(false);
        setEditingSalesperson(null);
      })
      .catch(error => console.error('Error updating Salesperson:', error));
  }; 

  const handleCancelEdit = () => {
    setIsModalOpen(false); // Close modal without saving changes
    setEditingSalesperson(null);
  };

  return (
    <div className="Salesperson-list">
      <h2>Sales List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>StartDate</th>
            <th>Manager</th>
          </tr>
        </thead>
        <tbody>
          {Salespersons.map(Salesperson => (
            <tr key={Salesperson.SalespersonID}>
              <td>{Salesperson.firstName}</td>
              <td>{Salesperson.lastName}</td>
              <td>{Salesperson.address}</td>
              <td>{Salesperson.phone}</td>
              <td>{Salesperson.startDate}</td>
              <td>{Salesperson.manager}</td>
              <td>
                <button onClick={() => handleEditClick(Salesperson)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing Salesperson */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit First SalesPerson</h3>
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
              Manager:
              <input 
                type="text" 
                value={updatedManager} 
                onChange={(e) => setUpdatedManager(e.target.value)} 
              />
            </label>
            <div>
              <button onClick={handleUpdateSalesperson}>Update</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPersonsList;
