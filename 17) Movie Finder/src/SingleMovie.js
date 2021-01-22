import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_ENDPOINT } from './context';

const SingleMovie = () => {
  // get unique id
  const { id } = useParams();

  // state values
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: '' });

  // fetch one movie function
  const fetchMovie = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === 'False') {
      setError({ show: true, msg: data.Error });
    } else {
      setMovie(data);
    }
    setLoading(false);
  };

  // useEffect
  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, [id]);

  // jsx
  if (loading) {
    return <div className="loading"></div>;
  }

  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    );
  }

  const { Poster: img, Title: name, Year: year, Plot: desc } = movie;

  return (
    <section className="single-movie">
      <img src={img} alt={name} />
      <div className="single-movie-info">
        <h2>{name}</h2>
        <p>{desc}</p>
        <h4>{year}</h4>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
