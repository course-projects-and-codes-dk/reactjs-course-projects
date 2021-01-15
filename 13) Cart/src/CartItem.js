import React from 'react';
import { useGlobalContext } from './context';
import { FaTrash, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const CartItem = ({ id, img, title, price, amount }) => {
  // destructuring from global context
  const { remove, increase, decrease, toggleAmount } = useGlobalContext();
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        {/* remove button */}
        <button className="remove-btn" onClick={() => remove(id)}>
          <FaTrash />
        </button>
      </div>
      <div>
        {/* increase amount */}
        <button className="amount-btn" onClick={() => toggleAmount(id, 'inc')}>
          <FaPlusCircle />
        </button>
        {/* amount */}
        <p className="amount">{amount}</p>
        {/* decrease amount */}
        <button className="amount-btn" onClick={() => toggleAmount(id, 'dec')}>
          <FaMinusCircle />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
