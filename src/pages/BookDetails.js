import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBook() {
      try {
        const { data, error } = await supabase
          .from('books')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setBook(data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchBook();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const user = await supabase.auth.getUser();
      console.log('00000',user.data.user.email);
      if (!user) {
        // Redirect to login if user is not authenticated
        navigate('/home');
        return;
      }
      const { data, error } = await supabase
        .from('cart')
        .insert([
          {
            user_email: user.data.user.email,
            book_id: book.id,
            
          },
        ]);

      if (error) throw error;
      alert('Book added to cart!');
      navigate('/home');
    } catch (error) {
      alert('Error adding book to cart: ' + error.message);
      
    }
  };

  const handleBuyNow = () => {
    const user = supabase.auth.user();
    if (!user) {
      // Redirect to login if user is not authenticated
      navigate('/login');
      return;
    }
    navigate('/payment', { state: { book } });
  };

  return (
    <div style={styles.container}>
      {book ? (
        <div style={styles.card}>
          <h2 style={styles.title}>{book.title}</h2>
          <p style={styles.author}>by {book.author}</p>
          <p style={styles.description}>{book.description}</p>
          <p style={styles.price}>${book.price.toFixed(2)}</p>
          <button style={styles.button} onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button style={styles.button} onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      ) : error ? (
        <p style={styles.loading}>Error: {error}</p>
      ) : (
        <p style={styles.loading}>Loading book details...</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
  },
  author: {
    fontSize: '18px',
    color: '#777',
    marginBottom: '20px',
  },
  description: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  price: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1d3557',
    marginBottom: '25px',
  },
  button: {
    padding: '12px 25px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#1d3557',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    margin: '10px',
  },
  loading: {
    fontSize: '18px',
    color: '#777',
  },
};

// Hover effect for button
styles.button[':hover'] = {
  backgroundColor: '#457b9d',
};

export default BookDetails;
