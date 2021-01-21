import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Photo from './Photo';

// variables
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

// COMPONENT
function App() {
  // states
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');

  // useEffects
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [page]);
  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => oldPage + 1);
      }
    });
    return () => window.removeEventListener('scroll', event);
    // eslint-disable-next-line
  }, []);

  // FETCH FUNCTION
  const fetchImages = async () => {
    // 1) initialize loading
    setLoading(true);
    // 2) define url
    let url;
    // 3.1) url if input exists
    if (query) {
      url = `${searchUrl}${clientID}&per_page=9&page=${page}&query=${query}`;
    }
    // 3.2) url if input isn't there
    else {
      url = `${mainUrl}${clientID}&per_page=9&page=${page}`;
    }
    // 4) perform fetch request
    try {
      // 4.1) get data
      const response = await fetch(url);
      const data = await response.json();
      // 4.2) update photos with existing photos
      setPhotos((existingPics) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...existingPics, ...data.results]; // data returned is nested
        } else {
          return [...existingPics, ...data];
        }
      });
      // 4.3) hide loader
      setLoading(false);
    } catch (error) {
      // 5) handle error
      setLoading(false);
      console.log(error);
    }
  };

  // handle submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  // JSX
  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder={`Search`}
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="submit-btn" type="submit" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo, index) => {
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
