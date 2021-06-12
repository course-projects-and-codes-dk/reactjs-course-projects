import React from 'react';
import { Link } from 'react-router-dom';

const Cocktail = ({ id, name, image, info, glass }) => {
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={image} alt={name} />
        <Link to={`/cocktail/${id}`} className="btn btn-details">
          details
        </Link>
      </div>
      <div className="cocktail-footer">
        <div className="footer-title">
          <h3>{name}</h3>
          <h4>{glass}</h4>
        </div>
        <p>{info}</p>
      </div>
    </article>
  );
};

export default Cocktail;
