// client/src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Autowise Parts</h1>
      <p>Find the best automotive parts for your vehicle.</p>
      <Link to="/products">Browse Products</Link>
    </div>
  );
}

export default Home;