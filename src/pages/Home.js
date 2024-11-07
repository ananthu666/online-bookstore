import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import BookCard from '../components/BookCard';
import Search from '../components/Search';

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const { data } = await supabase.from('books').select('*');
      setBooks(data);
    }
    fetchBooks();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <Search setBooks={setBooks} />
      </div>
      <div style={styles.grid}>
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    
  },
  searchContainer: {
    marginBottom: '20px',
    padding: '10px 15px',
    backgroundColor: '#f0f4f8',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    
    maxHeight:"65vh",
    overflowY:"scroll",
    // hide scrollbar
    scrollbarWidth: 'none',
  },
};

export default Home;
