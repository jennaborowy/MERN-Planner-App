import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { useLocation, Link } from 'react-router-dom';

const ToggleButton = () => {
  const location = useLocation(); // Get the current location
  const { theme } = useContext(ThemeContext);

  // Determine the button text based on the current path
  const buttonText = location.pathname === '/calendar' ? 'Todo List' : 'Calendar';
  const targetPath = location.pathname === '/calendar' ? '/' : '/calendar';

  return (
    <Link to={targetPath}>
      <button className={`shadow btn mt-2 ${theme}`}>
        {buttonText}
      </button>
    </Link>
  );
};

export default ToggleButton;
