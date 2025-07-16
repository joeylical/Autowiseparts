// client/src/components/Checkout.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/actions';
import { useHistory } from 'react-router-dom';

function Checkout() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleCheckout = () => {
    // Simulate payment processing and order creation
    setTimeout(() => {
      setPaymentSuccess(true);
      dispatch(clearCart());
      history.push('/order/123'); // Simulate order ID
    }, 2000);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  if (cartItems.length === 0) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Your cart is empty.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Checkout</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cartItems.map((item) => (
          <li key={item.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <strong>Total: ${calculateTotal()}</strong>
      </div>
      <button onClick={handleCheckout} disabled={paymentSuccess}>
        {paymentSuccess ? 'Processing...' : 'Complete Purchase'}
      </button>
      {paymentSuccess && <p>Payment successful! Redirecting to order tracking...</p>}
    </div>
  );
}

export default Checkout;