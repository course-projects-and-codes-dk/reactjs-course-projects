import React, { useState } from 'react';
import data from './data';

function App() {
  // setting up states
  const [count, setCount] = useState(0);
  const [text, setText] = useState([]);

  // function for submitting
  const handleSubmit = (e) => {
    e.preventDefault();
    let amount = parseInt(count);
    if (amount >= data.length) {
      amount = data.length - 1;
    }
    console.log(data.length);
    setText(data.slice(0, amount)); //from 0 index till amount(amount not inc)
  };

  // JSX
  return (
    <section className="section-center">
      <div>
        {/* title */}
        <h3>wanna generate some random text?</h3>
        {/* form */}
        <form className="lorem-form" onSubmit={handleSubmit}>
          <label htmlFor="amount">No. of Paragraphs:</label>
          <input
            type="number"
            name="amount"
            id="amount"
            min="0"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <button className="btn" type="submit">
            print
          </button>
        </form>
        {/* text */}
        <article className="lorem-text">
          {text.map((para, index) => {
            return <p key={index}>{para}</p>;
          })}
        </article>
      </div>
    </section>
  );
}

export default App;
