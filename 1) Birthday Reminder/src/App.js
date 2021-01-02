import React, { useState } from 'react';
import data from './data';
import List from './List';
function App() {
  // use state
  const [people, setPeople] = useState(data);

  // JSX
  return (
    <main>
      <section className="container">
        <h3>{people.length} birthdays today</h3>
        {/* creating a prop */}
        <List props={people} />
        <button onClick={() => setPeople([])}>clear all</button>
      </section>
    </main>
  );
}

export default App;
