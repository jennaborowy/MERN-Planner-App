import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ToggleButton = () => {
  const location = useLocation(); // Get the current location

  // Determine the button text based on the current path
  const buttonText = location.pathname === '/calendar' ? 'Todo List' : 'Calendar';
  const targetPath = location.pathname === '/calendar' ? '/' : '/calendar';

  return (
    <Link to={targetPath}>
      <button className="toggle-button">
        {buttonText}
      </button>
    </Link>
  );
};

export default ToggleButton;
