// client/src/components/Home.js
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const history = useHistory();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Autowise Parts</h1>
      <p>Find the best automotive parts for your vehicle.</p>
      <Link to="/products">Browse Products</Link>
      <Link to="/cart" style={{ marginLeft: '20px' }}>View Cart</Link>
      <Link to="/orders" style={{ marginLeft: '20px' }}>Order History</Link>
      <button onClick={handleLogout} style={{ marginLeft: '20px' }}>Logout</button>
    </div>
  );
}

export default Home;