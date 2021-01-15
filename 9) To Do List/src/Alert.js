import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {
  // use effect to display alert just for 3 secs
  useEffect(() => {
    setTimeout(() => {
      removeAlert();
    }, 2000);
  }, [list]);

  // JSX
  return <p className={`alert ${type}`}>{msg}</p>;
};

export default Alert;
