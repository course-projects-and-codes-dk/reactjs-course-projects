import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

// 💥 get data from LS
const getLocalStorage = () => {
  const list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
function App() {
  // setting up states
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  // use effect for LS
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  // 💥submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // show alert
      showAlert(true, 'danger', 'please enter a task ‼');
    } else if (name && isEditing) {
      // update item
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      // set edit state
      setIsEditing(false);
      // set edit ID
      setEditID(null);
      // set name
      setName('');
      // show alert
      showAlert(true, 'success', 'new item added to the list ✅');
    } else {
      // show alert
      showAlert(true, 'primary', 'item added to the list ✅');
      // create an item
      const newItem = { id: new Date().getTime().toString(), title: name };
      // add to list
      setList([...list, newItem]);
      setName('');
    }
  };

  // 💥show alert function
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  // 💥clear all function
  const clearAll = () => {
    // show alert
    showAlert(true, 'danger', 'all items deleted ⚪');
    // delete all
    setList([]);
  };

  // 💥remove item function
  const removeItem = (id) => {
    // show alert
    showAlert(true, 'danger', 'item removed from the list ✖');
    // delete item
    setList(list.filter((item) => item.id !== id));
  };

  // 💥edit item function
  const editItem = (id) => {
    // get item to edit
    const specificItem = list.find((item) => item.id === id);
    // set edit state
    setIsEditing(true);
    // set edit ID
    setEditID(id);
    // put item in input field
    setName(specificItem.title);
  };

  // JSX
  return (
    <main>
      <header>
        <h2>to do list</h2>
      </header>
      <section className="section-center">
        <form onSubmit={handleSubmit} className="grocery-form">
          {/* alert box */}
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          {/* title */}
          {/* input field */}
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="e.g. walk my dog"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="btn submit-btn" type="submit">
              {isEditing ? 'edit' : 'add'}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="grocery-container">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className="btn clear-btn" onClick={clearAll}>
              clear all
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
