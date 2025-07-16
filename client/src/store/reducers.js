// client/src/store/reducers.js
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './actions';

const initialState = {
  products: [
    { id: 1, name: 'Spark Plug', price: 10, description: 'High-performance spark plug.' },
    { id: 2, name: 'Oil Filter', price: 15, description: 'Premium oil filter.' },
    { id: 3, name: 'Brake Pads', price: 30, description: 'Durable brake pads.' },
    // Add more products
  ],
  cart: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };
    case REMOVE_FROM_CART:
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    case CLEAR_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export default rootReducer;