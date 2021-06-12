import React from 'react';
import { useGlobalContext } from '../context';

const SearchForm = () => {
  // using global context
  const { setSearchTerm } = useGlobalContext();
  const serachValue = React.useRef('');

  React.useEffect(() => {
    serachValue.current.focus();
  }, []);

  return (
    <section className="section search">
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="form-control">
          <label htmlFor="name">search for your favourite cocktail</label>
          <input
            type="text"
            id="name"
            placeholder="A..."
            ref={serachValue}
            onChange={() => {
              setSearchTerm(serachValue.current.value);
            }}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
