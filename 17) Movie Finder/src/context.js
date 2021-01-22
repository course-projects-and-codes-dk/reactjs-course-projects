import React, { useState, useContext, useEffect } from 'react';
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // state values
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: '' });
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('batman');

  // fetchMovies
  const fetchMovies = async (url) => {
    // 1) show loading while fetching
    setLoading(true);
    // 2) get data from api
    const response = await fetch(url);
    const data = await response.json();
    // 3.1) if we get a proper response
    if (data.Response === 'True') {
      // a) update movies
      setMovies(data.Search);
      // b) hide prev erros (if any)
      setError({ show: false, msg: '' });
    }
    // 3.2) if we don't get a proper response
    else {
      setError({ show: true, msg: data.Error });
    }
    // 4) hide loading
    setLoading(false);
  };

  // useEffect
  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}&s=${query}`);
  }, [query]);

  return (
    <AppContext.Provider value={{ loading, error, movies, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
