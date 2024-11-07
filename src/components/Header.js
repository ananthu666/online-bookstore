import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.title}>Online Book Store</h1>
        <nav style={styles.nav}>
          <Link 
            to="/home" 
            style={styles.link} 
            onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)} 
            onMouseOut={(e) => (e.target.style.color = styles.link.color)}
          >
            Home
          </Link>
          <Link 
            to="/cart" 
            style={styles.link} 
            onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)} 
            onMouseOut={(e) => (e.target.style.color = styles.link.color)}
          >
            Cart
          </Link>
          {/* <Link 
            to="/register" 
            style={styles.link} 
            onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)} 
            onMouseOut={(e) => (e.target.style.color = styles.link.color)}
          >
            Register
          </Link> */}
        </nav>
      </div>
    </header>
  );
}

// Inline styles at the bottom of the file
const styles = {
  header: {
    backgroundColor: '#1d3557',
    padding: '20px 0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: '90%',
    // maxWidth: '1200px',
    margin: '0 auto',
    marginLeft: '20px',
    marginRight: '20px',
  },
  title: {
    color: '#f1faee',
    fontSize: '34px',
    fontWeight: 'bold',
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: '#a8dadc',
    textDecoration: 'none',
    fontSize: '18px',
    transition: 'color 0.3s ease',
  },
  linkHover: {
    color: '#f1faee',
  },
};

export default Header;
