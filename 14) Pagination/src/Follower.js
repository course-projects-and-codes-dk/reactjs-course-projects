import React from 'react';

const Follower = ({ avatar_url: image, html_url: url, login: username }) => {
  // JSX
  return (
    <article className="card">
      <img src={image} alt={username} />
      <div>
        <h3>{username}</h3>
        <a href={url} className="btn">
          view profile
        </a>
      </div>
    </article>
  );
};

export default Follower;
