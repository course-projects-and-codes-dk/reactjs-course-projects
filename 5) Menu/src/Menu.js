import React from 'react';

// UNDERSTANDING PROPS AND DESTRUCTURING
// const Menu = (props) => {
//   const items = props.items;
//   return <h2>{console.log(items)}</h2>;
// };

function Menu({ items }) {
  return (
    <div className="section-center">
      {items.map((item) => {
        const { id, title, price, img, desc } = item;
        return (
          <article className="menu-item" key={id}>
            <img src={img} alt={title} className="photo" />
            <div className="item-info">
              <header>
                <h4>{title}</h4>
                <h4 className="price">${price}</h4>
              </header>
              <p className="item-text">{desc}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default Menu;
