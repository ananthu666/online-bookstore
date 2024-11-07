import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  // Fetch cart items for authenticated user and join with book details
  useEffect(() => {
    const fetchCartItems = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('cart')
          .select(`
            id, user_email, book_id,
            books(title, author, price)
          `)
          .eq('user_email', user.email);

        if (!error) {
          setCartItems(data);
        } else {
          console.error("Error fetching cart items:", error.message);
        }
      }
    };
    fetchCartItems();
  }, []);

  // Calculate total price for selected items
  useEffect(() => {
    const selectedTotal = selectedItems.reduce((sum, item) => sum + item.books.price, 0);
    setTotal(selectedTotal);
  }, [selectedItems]);

  // Handle item selection
  const handleSelectItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(selected => selected.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Remove an item from the cart
  const removeItem = async (id) => {
    await supabase.from('cart').delete().eq('id', id);
    setCartItems(cartItems.filter(item => item.id !== id));
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  // Delete all selected items
  const deleteSelectedItems = async () => {
    const ids = selectedItems.map(item => item.id);
    await supabase.from('cart').delete().in('id', ids);
    setCartItems(cartItems.filter(item => !ids.includes(item.id)));
    setSelectedItems([]);
  };

  // Handle proceed to payment
  const handleProceedToPayment = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to proceed to payment.");
    }
    else
    {
      navigate('/payment', { state: { selectedItems } }); 
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Your Cart</h2>
      {cartItems.length ? (
        <>
          <div style={styles.cartGrid}>
            {cartItems.map(item => (
              <div key={item.id} style={styles.cartItem}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  onChange={() => handleSelectItem(item)}
                  style={styles.checkbox}
                />
                <h4 style={styles.itemTitle}>{item.books.title}</h4>
                <p style={styles.itemAuthor}>by {item.books.author}</p>
                <p style={styles.itemPrice}>Price: ${item.books.price}</p>
                <button onClick={() => removeItem(item.id)} style={styles.removeButton}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div style={styles.totalContainer}>
            <h3 style={styles.totalText}>Selected Total: ${total}</h3>
            <button onClick={deleteSelectedItems} style={styles.deleteButton}>
              Delete Selected
            </button>
            
              <button
                style={styles.checkoutButton}
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </button>
           
          </div>
        </>
      ) : (
        <p style={styles.emptyMessage}>Your cart is empty.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: 'auto',
    marginTop: '20px',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    maxHeight: '80vh',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
    textAlign: 'center',
  },
  cartGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '15px',
    overflowY: 'auto',
    maxHeight: '50vh',
    paddingBottom: '20px',
    scrollbarWidth: 'none',
  },
  cartItem: {
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  checkbox: {
    marginBottom: '10px',
  },
  itemTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1d3557',
    margin: '5px 0',
  },
  itemAuthor: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '5px',
  },
  itemPrice: {
    fontSize: '16px',
    color: '#1d3557',
    fontWeight: 'bold',
  },
  removeButton: {
    marginTop: '10px',
    padding: '8px 16px',
    backgroundColor: '#ff6347',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  totalContainer: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#ff6347',
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  checkoutButton: {
    padding: '10px 20px',
    backgroundColor: '#1d3557',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  link: {
    textDecoration: 'none',
  },
  emptyMessage: {
    fontSize: '18px',
    color: '#999',
    textAlign: 'center',
  },
};

export default Cart;
