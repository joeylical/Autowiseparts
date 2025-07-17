import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        // In a real application, you would get the userId from authentication context
        const userId = 'guest'; // For now, use 'guest' as a placeholder
        const response = await api.get(`/orders?userId=${userId}`);
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch order history.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Loading order history...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  if (orders.length === 0) return <div style={{ padding: '20px' }}>No orders found.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Order History</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {orders.map((order) => (
          <li key={order.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
            {console.log('OrderHistory - order.createdAt:', order.createdAt)}
            <Link to={`/order/${order.id}`} style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
              Order ID: {order.id} - Total: ${order.totalAmount.toFixed(2)} {order.orderStatus && `- Status: ${order.orderStatus}`}
            </Link>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Placed on: {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderHistory;
