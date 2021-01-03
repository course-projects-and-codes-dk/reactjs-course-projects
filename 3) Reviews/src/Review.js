import React, { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Review = () => {
  // creating a state
  const [index, setIndex] = useState(0);
  // destructuring using a single person
  const { name, job, image: img, text } = people[index];

  // returing last or first review for ending data
  const checkNum = (n) => {
    if (n > people.length - 1) {
      return 0;
    }
    if (n < 0) {
      return people.length - 1;
    }
    return n;
  };

  // prev/next event handler function
  const prevPerosn = () => {
    // below is functional update form of usestate
    setIndex((index) => checkNum(index - 1));
  };
  const nextPerosn = () => {
    // below is functional update form of usestate
    if (index < people.length) {
      setIndex((index) => checkNum(index + 1));
    }
  };

  // random btn function
  const randomPerson = () => {
    const num = Math.floor(Math.random() * people.length);
    setIndex(num);
  };

  // creating a review
  return (
    <article className="review">
      <div className="img-container">
        <img src={img} alt={name} className="person-img" />
        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div>
      <h4 className="author">{name}</h4>
      <p className="job">{job}</p>
      <p className="info">{text}</p>
      <div className="button-container">
        <button className="prev-btn" onClick={prevPerosn}>
          <FaChevronLeft />
        </button>
        <button className="next-btn" onClick={nextPerosn}>
          <FaChevronRight />
        </button>
      </div>
      <button className="random-btn" onClick={randomPerson}>
        surprise me
      </button>
    </article>
  );
};

export default Review;
