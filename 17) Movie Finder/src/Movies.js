import React from 'react';
import { useGlobalContext } from './context';
import { Link } from 'react-router-dom';
const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';

const Movies = () => {
  // get data from custom hook
  const { movies, loading } = useGlobalContext();

  // jsx
  if (loading) {
    return <div className="loading"></div>;
  }
  return (
    <div className="movies">
      {movies.map((movie) => {
        const { imdbID: id, Poster: img, Title: name, Year: year } = movie;
        return (
          <Link to={`/movies/${id}`} key={id} className="movie">
            <article>
              <img src={img === 'N/A' ? url : img} alt={name} />
              <div className="movie-info">
                <h4>{name}</h4>
                <p>{year}</p>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
};

export default Movies;
