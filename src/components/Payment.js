import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Payment() {
  const { state } = useLocation();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [message, setMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false); // Hover state for button
  
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    if (state && state.selectedItems) {
      setSelectedItems(state.selectedItems);
    }
  }, [state]);

  // Calculate the total price of selected items
  console.log(state.selectedItems, 'selectedItems is required');
  const totalPrice = selectedItems.reduce((total, item) => total + item.books.price, 0);

  const handlePayment = (e) => {
    e.preventDefault();
    // Mock payment processing - replace with real payment processing logic
    setMessage('Payment successful!');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Payment Information</h2>
      <form onSubmit={handlePayment} style={styles.form}>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Card Number"
          required
          style={styles.input}
        />
        <div style={styles.inputGroup}>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="Expiry Date (MM/YY)"
            required
            style={styles.inputHalf}
          />
          <input
            type="text"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="CVC"
            required
            style={styles.inputHalf}
          />
        </div>
        <button
          type="submit"
          style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setIsHovered(true)}  // Mouse enter to apply hover effect
          onMouseLeave={() => setIsHovered(false)} // Mouse leave to remove hover effect
        >
          Pay Now
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}

      {/* Selected Items List */}
      <div style={styles.selectedItemsContainer}>
        <h3>Selected Items:</h3>
        {selectedItems.length > 0 ? (
          <div style={styles.itemsList}>
            <ul style={styles.itemsListUl}>
              {selectedItems.map((item, index) => (
                <li key={index} style={styles.item}>
                  <span style={styles.itemTitle}>{item.books.title}</span>
                  <span style={styles.itemPrice}>${item.books.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div style={styles.totalPrice}>
              <strong>Total: </strong>${totalPrice.toFixed(2)}
            </div>
          </div>
        ) : (
          <p>No items selected</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: 'auto',
    marginTop: '10%',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1d3557',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    margin: '8px 0',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  inputGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  inputHalf: {
    width: '48%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '12px',
    backgroundColor: '#1d3557',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '15px',
  },
  buttonHover: {
    backgroundColor: '#457b9d', // Hover background color
  },
  message: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '18px',
    color: '#28a745',
    fontWeight: 'bold',
  },
  selectedItemsContainer: {
    marginTop: '20px',
  },
  itemsList: {
    maxHeight: '200px', // Set the maximum height
    overflowY: 'auto',  // Add scroll if list exceeds maxHeight
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: '#f4f4f4',
  },
  itemsListUl: {
    padding: '0',
    margin: '0',
    listStyleType: 'none',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #ddd',
  },
  itemTitle: {
    fontSize: '16px',
    color: '#333',
  },
  itemPrice: {
    fontSize: '16px',
    color: '#28a745',
  },
  totalPrice: {
    marginTop: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1d3557',
  },
};

export default Payment;
