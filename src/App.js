import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Register from './pages/Register';
import Header from './components/Header';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { supabase } from './supabaseClient'; // Assuming you have a supabaseClient.js file

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on initial load
    const session = supabase.auth.getSession();
    if (session) {
      setIsAuthenticated(true);
    }

    // Listen for authentication state changes
    supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  return (
    <Router>
      {isAuthenticated && <Header />} {/* Render Header only if authenticated */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
