import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function Search({ setBooks }) {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = async () => {
    let query = supabase.from('books').select('*');

    // Add title search filter
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    // Add minimum and maximum price filters
    if (minPrice) {
      query = query.gte('price', parseFloat(minPrice));
    }
    if (maxPrice) {
      query = query.lte('price', parseFloat(maxPrice));
    }

    const { data } = await query;
    setBooks(data);
  };

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a book"
        style={styles.input}
      />
      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="Min Price"
        style={styles.priceInput}
      />
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Max Price"
        style={styles.priceInput}
      />
      <button onClick={handleSearch} style={styles.button}>
        Search
      </button>
    </div>
  );
}

const styles = {
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  input: {
    flex: 2,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
  },
  priceInput: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#1d3557',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
};

// Hover effect for button
styles.button[':hover'] = {
  backgroundColor: '#457b9d',
};

export default Search;
