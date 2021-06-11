import React from 'react';

const List = ({ props }) => {
  return (
    <>
      {props.map((person) => {
        // destructing single element of props array which is an object
        const { id, name, age, image } = person;
        // JSX
        return (
          <article key={id} className="person">
            <img src={image} alt={name} />
            <div>
              <h4>{name}</h4>
              <p>{age} years</p>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default List;
