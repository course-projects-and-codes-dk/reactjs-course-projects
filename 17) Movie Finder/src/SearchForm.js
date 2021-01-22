import React from 'react';
import { useGlobalContext } from './context';

const SearchForm = () => {
  // get data from custom hook
  const { query, setQuery, error } = useGlobalContext();

  // jsx
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <h2>search your favourite movies</h2>
      <input
        type="text"
        className="form-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {error.show && <div className="error">{error.msg}</div>}
    </form>
  );
};

export default SearchForm;
