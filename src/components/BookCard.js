import React from 'react';
import { Link } from 'react-router-dom';

function BookCard({ book }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{book.title}</h3>
      <p style={styles.author}>{book.author}</p>
      <Link to={`/book/${book.id}`} style={styles.link}>
        View Details
      </Link>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '250px',
    margin: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    backgroundColor: '#fff',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    margin: '10px 0',
  },
  author: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '15px',
  },
  link: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#1d3557',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
    fontWeight: 'bold',
  },
};

// Add hover effect
styles.card[':hover'] = {
  transform: 'translateY(-5px)',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
};

styles.link[':hover'] = {
  backgroundColor: '#457b9d',
};

export default BookCard;
