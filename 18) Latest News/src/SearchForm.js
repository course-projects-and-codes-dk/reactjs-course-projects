import React from 'react';
import { useGlobalContext } from './context';

const SearchForm = () => {
  // custom hook
  const { query, handleSearch } = useGlobalContext();

  // jsx
  return (
    <form className="search-form" onClick={(e) => e.preventDefault()}>
      <h2>search for latest news</h2>
      <input
        type="text"
        className="form-input"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchForm;
