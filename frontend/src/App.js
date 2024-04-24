//App.js 
import axios from "axios";
import React, { useContext, useEffect, useState } from 'react'; 
import TodoModal from './components/TodoModal'; 
import Calendar from "./components/Calendar";
import { ThemeContext } from "./components/ThemeContext";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; // for sun and moon
  
function App() { 
  // have a theme context to be able to set theme for all comopnents
  const { theme, toggleDark, toggleLight } = useContext(ThemeContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  // fetch the TodoList for the chosen day
  useEffect(() => {
    if (selectedDate) {
      const dateString = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
      axios.get(`http://127.0.0.1:3001/getTodoList?date=${dateString}`)
          .then(res => {
              setTodoList(res.data);
          })
          .catch(err => console.log(err));
    }
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [selectedDate, theme]);

  const handleDateClick = (arg) => {
    console.log("Date clicked: ", arg.date);
    // selectedDate is the date clicked in Calendar
    setSelectedDate(arg.date);
    // let user see selectedDate's todo list
    setModalVisible(true);
  };

  // Delete task from database 
  const deleteTask = (id) => { 
    axios.delete('http://127.0.0.1:3001/deleteTodoList/' + id) 
        .then(result => { 
            console.log(result);
            // Update the local todo list to remove the deleted task
            setTodoList(todoList.filter(task => task._id !== id)); 
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        }) 
        .catch(err => 
            console.log(err) 
        ) 
  } 
  
  return ( 
    <div className={`gradient ${theme} vh-100`}>
      <div className="overflow-fix" data-bs-theme={{theme}}> 
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
            
          </div>
          <div className="row">
            <Calendar 
              handleDateClick={handleDateClick}
              tasks={tasks}
              setTasks={setTasks}
            />
          </div>
          {modalVisible && (
            <TodoModal
              isVisible={modalVisible}
              onClose={() => setModalVisible(false)}
              selectedDate={selectedDate}
              todoList={todoList}
              setTodoList={setTodoList}
              deleteTask={deleteTask}
              theme={theme}
            />
          )}
        
      </div>
    </div>
  ); 
} 
  
export default App;
