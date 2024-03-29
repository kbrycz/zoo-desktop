import React, { useState } from 'react';
import '../../styles/Scan/SearchScreen.css';
import server from '../../../api/server';

function SearchScreen({onUserFound}) {
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
      if (response.data.user) {
        onUserFound(response.data.user); // Use the passed function to update the state in ScanScreen
      } else {
        console.log('No matching user found or multiple users returned.');
      }
  
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
      <h1>Search</h1>
      <div className='search-form-container'>
        <form onSubmit={handleSubmit} className="search-form">
          <div className="input-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              placeholder="First Name"
              disabled={phoneNumber.length > 0}
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              placeholder="Last Name"
              disabled={phoneNumber.length > 0}
            />
          </div>
          <h3>Or</h3>
          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              id="phoneNumber"
              type="tel"
              value={formatPhoneNumber(phoneNumber)}
              onChange={handlePhoneNumberChange}
              placeholder="(123) 456-7890"
              disabled={firstName.length > 0 || lastName.length > 0}
            />
          </div>
          <button type="submit" className="search-button" disabled={loading || (!lastName && !phoneNumber)}>
            {loading ? 'Searching...' : 'Search'}
          </button>
          {loading && <div className="loading-indicator">
            <p>Loading...</p>
            </div>}
        </form>
      </div>
    </div>

  );
}

export default SearchScreen;
