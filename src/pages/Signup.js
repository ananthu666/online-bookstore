// src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Redirect to home page on successful signup
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
      <p>Already have an account? <a href="/" style={styles.link}>Login</a></p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '10% auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
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
  },
  error: {
    color: '#ff6347',
    fontSize: '16px',
  },
  link: {
    textDecoration: 'none',
    color: '#1d3557',
  },
};

export default Signup;
