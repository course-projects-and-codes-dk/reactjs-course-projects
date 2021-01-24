import React from 'react';
import { useGlobalContext } from './context';

const Buttons = () => {
  // custom hook
  const { isLoading, page, nbPages, handlePage } = useGlobalContext();

  // jsx
  return (
    <div className="btn-container">
      <button disabled={isLoading} onClick={() => handlePage('dec')}>
        prev
      </button>
      <p>
        {page + 1} of {nbPages}
      </p>
      <button disabled={isLoading} onClick={() => handlePage('inc')}>
        next
      </button>
    </div>
  );
};

export default Buttons;
