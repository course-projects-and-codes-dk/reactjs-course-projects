// reducer function
const reducer = (state, action) => {
  // clear cart
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }

  // remove single item
  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    };
  }

  // increase single item(not used)
  if (action.type === 'INCREASE') {
    let tempCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount++ };
      }
      return item;
    });
    return {
      ...state,
      cart: tempCart,
    };
  }

  // decrease single item(not used)
  if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount-- };
        }
        return item;
      })
      .filter((item) => item.amount !== 0);
    return {
      ...state,
      cart: tempCart,
    };
  }

  // toggle amount
  if (action.type === 'TOGGLE') {
    let tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.type === 'inc') {
            return { ...item, amount: item.amount++ };
          }
          if (action.payload.type === 'dec') {
            return { ...item, amount: item.amount-- };
          }
        }
        return item;
      })
      .filter((item) => item.amount !== 0);
    return { ...state, cart: tempCart };
  }

  // get totals
  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        cartTotal.amount += amount;
        cartTotal.total += price * amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }

  // loading
  if (action.type === 'LOADING') {
    return { ...state, loading: true };
  }

  // fetch items
  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, cart: action.payload, loading: false };
  }

  // throw error
  throw new Error('no matching error types');
};

export default reducer;
