import React, { useState, useEffect } from 'react';

function SearchBar({ onSearch, initialSearchTerm = '' }) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', width: '300px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>Search</button>
    </form>
  );
}

export default SearchBar;