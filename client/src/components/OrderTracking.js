import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${id}`);
        setOrder(response.data);
      } catch (err) {
        setError('Failed to fetch order details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div style={{ padding: '20px' }}>Loading order details...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  if (!order) return <div style={{ padding: '20px' }}>Order not found.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order.id}</p>
      {console.log('OrderTracking - order.createdAt:', order.createdAt)}
      <p><strong>Order Date:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}</p>
      <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
      <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
      {order.orderStatus && <p><strong>Order Status:</strong> {order.orderStatus}</p>}

      <h3>Items:</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {order.items.map((item, index) => (
          <li key={index} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
            {item.name} x {item.quantity} - ${item.price * item.quantity}
          </li>
        ))}
      </ul>

      <h3>Shipping Address:</h3>
      <p>{order.shippingAddress.street}</p>
      <p>{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
    </div>
  );
}

export default OrderTracking;
