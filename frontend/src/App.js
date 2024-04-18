//App.js 
  
import React, { useContext, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Todo from './components/Todo'; 
import Calendar from "./components/Calendar";
import ToggleButton from "./components/ToggleButton";
import { ThemeContext } from "./components/ThemeContext";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; // for sun and moon
import './index.css';
  
function App() { 
  // have a theme context to be able to set theme for all comopnents
  const { theme, toggleDark, toggleLight } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);
  
  return ( 
    <div className={`gradient ${theme} vh-100`}>
      <div className="overflow-fix" data-bs-theme={{theme}}> 
        <BrowserRouter>
          <div className="row">
            <div className="mt-2 col">
              <div className="btn-group rounded shadow">
                <button
                  className={` btn theme-button ${theme} `}
                  onClick={toggleLight}
                >
                  <i class="bi bi-sun"></i>
                </button>
                <button
                  className={`btn theme-button ${theme}`}
                  onClick={toggleDark}
                >
                  <i className="bi bi-moon"></i>
                </button>
              </div>
            </div>
            <div className="col d-flex justify-content-end">
              <ToggleButton />
            </div>
          </div>
          <div className="row">
            <Routes>
              <Route path="/" element={<Todo />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  ); 
} 
  
export default App;
