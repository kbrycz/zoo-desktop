import React, { useState } from 'react';
import '../styles/SearchScreen.css';
import server from '../../api/server';

function SearchScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    if (event.target.value) {
      setPhoneNumber(''); // Clear phone number if first name is being entered
    }
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    if (event.target.value) {
      setPhoneNumber(''); // Clear phone number if last name is being entered
    }
  };

  const handlePhoneNumberChange = (event) => {
    // Use the unformat function to remove any formatting for the state
    const plainNumber = unformatPhoneNumber(event.target.value);
    setPhoneNumber(plainNumber);

    // Clear name if phone number is being entered
    if (plainNumber) {
      setFirstName('');
      setLastName('');
    }
    
  };

  const performSearch = async () => {
    setLoading(true);
  
    try {
      let response;
  
      // Determine which search to perform
      if (phoneNumber) {
        // Search by phone number
        response = await server.get('/searchByPhoneNumber', {
          params: {
            phone: `+1${unformatPhoneNumber(phoneNumber)}`, // Assuming the server expects a complete number with +1
          }
        });
      } else if (firstName && lastName) {
        // Search by first and last name
        response = await server.get('/searchByName', {
          params: {
            firstName: firstName,
            lastName: lastName,
          }
        });
      } else {
        throw new Error('Invalid search criteria');
      }
  
      // Log the search results
      console.log(response.data);
  
    } catch (error) {
      console.error('Search failed:', error);
      alert('Search failed. Please try again.');
    }
  
    setLoading(false);
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    performSearch();
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
  
    // Only keep numbers
    const phoneNumber = value.replace(/[^\d]/g, '');
    
    // US phone number formatting
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const unformatPhoneNumber = (value) => {
    return value.replace(/[^\d]/g, '');
  };
  

  return (
    <div className="search-screen">
      <h1>Search via Name or Phone Number</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="name-fields">
          <label htmlFor="firstName">First:</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="First Name"
            disabled={phoneNumber.length > 0}
          />
          <label htmlFor="lastName">Last:</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Last Name"
            disabled={phoneNumber.length > 0}
          />
        </div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          id="phoneNumber"
          type="tel"
          value={formatPhoneNumber(phoneNumber)} // Use the format function for display
          onChange={handlePhoneNumberChange}
          placeholder="(123) 456-7890"
          disabled={firstName.length > 0 || lastName.length > 0}
        />
        <button type="submit" className="search-button" disabled={loading || (!lastName && !phoneNumber)}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {loading && <div className="loading-indicator">Loading...</div>}
    </div>
  );
}

export default SearchScreen;
