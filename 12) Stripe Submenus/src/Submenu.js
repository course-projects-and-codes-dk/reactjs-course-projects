import React, { useState, useRef, useEffect } from 'react';
import { useGlobalContext } from './context';

const Submenu = () => {
  // get context functions
  const {
    isSubmenuOpen,
    location,
    page: { page, links },
  } = useGlobalContext();

  // select submenu element
  const container = useRef(null);

  // create state for column layout in submenu
  const [columns, setCoulmns] = useState('col-2');

  // useEffect
  useEffect(() => {
    // default layout
    setCoulmns('col-2');

    // submenu position
    const submenu = container.current;
    const { center, bottom } = location;
    submenu.style.left = `${center}px`;
    submenu.style.top = `${bottom}px`;

    // set column layout
    if (links.length === 3) {
      setCoulmns('col-3');
    }
    if (links.length > 3) {
      setCoulmns('col-4');
    }
  }, [location, links]);

  return (
    <aside
      className={`${isSubmenuOpen ? 'submenu show' : 'submenu'}`}
      ref={container}
    >
      <h4>{page}</h4>
      <div className={`submenu-center ${columns}`}>
        {links.map((link, index) => {
          const { label, icon, url } = link;
          return (
            <a href={url} key={index}>
              {icon}
              {label}
            </a>
          );
        })}
      </div>
    </aside>
  );
};

export default Submenu;
