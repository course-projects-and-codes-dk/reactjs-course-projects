import React, { useState } from 'react';
import Menu from './Menu';
import Categories from './Categories';
import items from './data';

// getting unique category btns
/**
 * using map to get category of all items
 * using SET to filter out only unique ones
 * changing them into an array from object
 * adding 'all' btn and using spread operator
 */
const allCategories = ['all', ...new Set(items.map((item) => item.category))];

function App() {
  // creating states
  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);

  // filtering items on click
  const filterItems = (category) => {
    if (category === 'all') {
      setMenuItems(items);
      return;
    }

    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  // JSX
  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>our menu</h2>
          <div className="underline"></div>
        </div>
        <Categories categories={categories} filterItems={filterItems} />
        <Menu items={menuItems} />
      </section>
    </main>
  );
}

export default App;
