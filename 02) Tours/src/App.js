import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project';
function App() {
  // useState
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  // removing tours one by one
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  // fetching tours
  const fetchTours = async () => {
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // using useEffect
  useEffect(() => {
    fetchTours();
  }, []);

  // if loading is true
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  // if no tours are there in setTours
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={fetchTours}>
            find more
          </button>
        </div>
      </main>
    );
  }

  // if loading is false
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
