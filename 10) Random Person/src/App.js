import React, { useState, useEffect } from 'react';
import {
  FaEnvelope,
  FaUser,
  FaCalendarTimes,
  FaSearchLocation,
  FaPhone,
  FaKey,
} from 'react-icons/fa';

// urls
const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/women/46.jpg';

// component
function App() {
  // setting up states
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('random person');

  // fetch function
  const getPerson = async () => {
    // 1) Get data
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    // 2) Get properties from data
    const { email, phone } = person;
    const { large: image } = person.picture;
    const {
      login: { password },
    } = person; // same way as above
    const { first, last } = person.name;
    const {
      dob: { age },
    } = person;
    const {
      street: { number, name },
    } = person.location;
    // 3) Create a new object with properties
    const newPerson = {
      image,
      phone,
      email,
      age,
      password,
      name: `${first} ${last}`,
      street: `${number} ${name}`,
    };
    // 4) Set new person
    setPerson(newPerson);
    // 5) Update default titles in UI
    setTitle('name');
    setValue(newPerson.name);
    // 6) Hide loading
    setLoading(false);
  };

  // call fetch person
  useState(() => {
    getPerson();
  }, []);

  // hover function
  const handleValue = (e) => {
    // 1) Check if hovering over icons or not
    if (e.target.classList.contains('icon')) {
      // 2) Get label on hover
      const newValue = e.target.dataset.label;
      // 3) Change title to current label
      setTitle(newValue);
      // 4) Change value to current label value
      setValue(person[newValue]);
    }
  };

  // JSX
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          {/* img */}
          <img
            src={(person && person.image) || defaultImage}
            alt="random user"
            className="user-img"
          />
          {/* title */}
          <p className="user-title">My {title} is</p>
          {/* value of title */}
          <p className="user-value">{value}</p>
          {/* btns */}
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaKey />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelope />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaSearchLocation />
            </button>
          </div>
          <button className="btn" onClick={getPerson}>
            {loading ? 'laoding...' : 'random user'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
