//App.js 
  
import React, { useState, useContext } from 'react'; 
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 
import Todo from './components/Todo'; 
import Calendar from "./components/Calendar";
import ToggleButton from "./components/ToggleButton";
import { ThemeProvider } from "./components/ThemeContext";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
  
function App() { 
  // light mode by default
  const [theme, setTheme] = useState("light");

  const handleThemeChange = (newTheme)  => {
      setTheme(newTheme);
  }

  return ( 
    <div className={`app-container ${theme}`}> 
        <div className={`theme-toggle btn-group ${theme}`}>
          <button
            className={`toggle-button ${theme === 'light' ? 'active' : ''}`}
            onClick={() => handleThemeChange('light')}
          >
            <i class="bi bi-sun"></i>
          </button>
          <button
            className={`toggle-button ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            <i className="bi bi-moon"></i>
          </button>
        </div>
        <BrowserRouter> 
            <div>
                <ToggleButton />
                <Routes> 
                    <Route path='/' element={<Todo theme={theme}/>}/> 
                    <Route path='/calendar' element={<Calendar className={theme}/>}/>        
                </Routes> 
            </div>
        </BrowserRouter> 
    </div> 
  ); 
} 
  
export default App;