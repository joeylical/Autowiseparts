// client/src/components/Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/actions';
import { Link } from 'react-router-dom';

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Your Cart is Empty</h2>
        <Link to="/products">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Shopping Cart</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cartItems.map((item) => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #eee',
              padding: '10px 0',
            }}
          >
            <div>
              <strong>{item.name}</strong> - ${item.price}
            </div>
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <strong>Total: ${calculateTotal()}</strong>
      </div>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <Link to="/checkout">Proceed to Checkout</Link>
      </div>
    </div>
  );
}

export default Cart;