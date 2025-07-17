// client/src/store/reducers.js
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, SET_PRODUCTS, UPDATE_CART_QUANTITY } from './actions';

const initialState = {
  products: [], // Products will be fetched from API
  cart: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    case ADD_TO_CART:
      {
        const item = action.payload;
        const existItem = state.cart.find((x) => x.id === item.id);

        if (existItem) {
          return {
            ...state,
            cart: state.cart.map((x) =>
              x.id === existItem.id ? { ...item, quantity: existItem.quantity + 1 } : x
            ),
          };
        } else {
          return {
            ...state,
            cart: [...state.cart, { ...item, quantity: 1 }],
          };
        }
      }
    case REMOVE_FROM_CART:
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    case UPDATE_CART_QUANTITY:
      {
        const { productId, quantity } = action.payload;
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity: parseInt(quantity) } : item
          ),
        };
      }
    case CLEAR_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export default rootReducer;