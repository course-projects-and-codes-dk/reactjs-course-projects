import React from 'react';

export const SearchBox = ({ handleChange }) => {
  return (
    <input
      type="search"
      className="search-box"
      placeholder="search monster"
      onChange={handleChange}
    />
  );
};
