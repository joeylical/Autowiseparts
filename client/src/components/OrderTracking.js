// client/src/components/OrderTracking.js
import React from 'react';
import { useParams } from 'react-router-dom';

function OrderTracking() {
  const { id } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Order Tracking</h2>
      <p>Order ID: {id}</p>
      <p>Status: Shipped</p>
      {/* Simulate tracking information */}
    </div>
  );
}

export default OrderTracking;