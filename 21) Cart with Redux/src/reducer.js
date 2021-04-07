import { CLEAR_CART, DECREASE, GET_TOTALS, INCREASE, REMOVE } from './actions';
// items
import cartItems from './cart-items';

// initial state
const initialStore = {
  cart: cartItems,
  total: 0,
  amount: 0,
};

// reducer function
const reducer = (state = initialStore, action) => {
  // clear cart
  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
    };
  }

  // decrease item
  if (action.type === DECREASE) {
    let tempCart = [];

    if (action.payload.amount === 1) {
      tempCart = state.cart.filter((item) => item.id !== action.payload.id);
    } else {
      tempCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            amount: item.amount - 1,
          };
        }
        return item;
      });
    }

    return {
      ...state,
      cart: tempCart,
    };
  }

  // increase item
  if (action.type === INCREASE) {
    let tempCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return {
          ...item,
          amount: item.amount + 1,
        };
      }
      return item;
    });

    return {
      ...state,
      cart: tempCart,
    };
  }

  // remove item
  if (action.type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    };
  }

  // get totals
  if (action.type === GET_TOTALS) {
    let { total, amount } = state.cart.reduce(
      (cartTotals, cartItem) => {
        cartTotals.amount += cartItem.amount;
        cartTotals.total += cartItem.amount * cartItem.price;
        return cartTotals;
      },
      {
        total: 0, // both of these are properties of cartTotals object
        amount: 0,
      }
    );

    total = parseFloat(total.toFixed(2));
    return {
      ...state,
      total,
      amount,
    };
  }

  // default
  return state;
};

export default reducer;
