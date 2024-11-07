import React, { useState } from 'react';

function Payment() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [message, setMessage] = useState('');

  const handlePayment = (e) => {
    e.preventDefault();
    // Mock payment processing - replace with real payment processing logic
    setMessage('Payment successful!');
  };

  return (
    <div>
      <h2>Payment</h2>
      <form onSubmit={handlePayment}>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Card Number"
          required
        />
        <input
          type="text"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          placeholder="Expiry Date (MM/YY)"
          required
        />
        <input
          type="text"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          placeholder="CVC"
          required
        />
        <button type="submit">Pay Now</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Payment;
