import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../store/actions';
import { Link, useHistory } from 'react-router-dom';

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return; // Prevent quantity from going below 1
    dispatch(updateCartQuantity(productId, quantity));
  };

  const total = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '10px', objectFit: 'cover' }} />
              <div>
                <strong>{item.name}</strong> - ${item.price}
                <div style={{ marginTop: '5px' }}>
                  Quantity:
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    style={{ width: '50px', marginLeft: '5px' }}
                  />
                </div>
              </div>
            </div>
            <button onClick={() => handleRemoveFromCart(item.id)} style={{ padding: '5px 10px', cursor: 'pointer' }}>Remove</button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <button onClick={() => history.goBack()} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Continue Shopping</button>
        <Link to="/checkout" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Proceed to Checkout</Link>
      </div>
    </div>
  );
}

export default Cart;
