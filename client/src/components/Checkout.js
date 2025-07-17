import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/actions';
import { Link, useHistory } from 'react-router-dom';
import api from '../services/api';

function Checkout() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    zip: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleShippingChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setOrderError(null);
    setOrderSuccess(false);
    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: calculateTotal(),
        shippingAddress,
        paymentInfo, // In a real app, this would be securely handled by a payment gateway
      };

      const response = await api.post('/orders', orderData);
      console.log('Order response:', response.data);
      // Assuming 201 status means success if no 'success' field is present
      dispatch(clearCart());
      setOrderSuccess(true);
      setTimeout(() => {
        history.push('/'); // Redirect to home page
      }, 2000); // Show success message for 2 seconds then redirect
    } catch (err) {
      setOrderError(err.response?.data?.message || 'An error occurred while placing the order.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Your cart is empty. <Link to="/products">Continue Shopping</Link></div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Checkout</h2>

      <h3>Order Summary</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cartItems.map((item) => (
          <li key={item.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
            {item.name} x {item.quantity} - ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <strong>Total: ${calculateTotal().toFixed(2)}</strong>
      </div>

      <h3>Shipping Information</h3>
      <div style={{ marginBottom: '20px' }}>
        <input type="text" name="street" placeholder="Street Address" value={shippingAddress.street} onChange={handleShippingChange} style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
        <input type="text" name="city" placeholder="City" value={shippingAddress.city} onChange={handleShippingChange} style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
        <input type="text" name="zip" placeholder="Zip Code" value={shippingAddress.zip} onChange={handleShippingChange} style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
      </div>

      <h3>Payment Information (Simulated)</h3>
      <div style={{ marginBottom: '20px' }}>
        <input type="text" name="cardNumber" placeholder="Card Number" value={paymentInfo.cardNumber} onChange={handlePaymentChange} style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
        <input type="text" name="expiryDate" placeholder="MM/YY" value={paymentInfo.expiryDate} onChange={handlePaymentChange} style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
        <input type="text" name="cvv" placeholder="CVV" value={paymentInfo.cvv} onChange={handlePaymentChange} style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
      </div>

      {orderError && <p style={{ color: 'red' }}>Error: {orderError}</p>}
      {orderSuccess && <p style={{ color: 'green' }}>Order placed successfully! Redirecting...</p>}

      <button
        onClick={handlePlaceOrder}
        disabled={loading || cartItems.length === 0}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1em',
          marginTop: '20px',
        }}
      >
        {loading ? 'Processing Order...' : 'Place Order'}
      </button>
    </div>
  );
}

export default Checkout;
