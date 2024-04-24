import React from "react"; 
import Todo from "./Todo";

function TodoModal({ isVisible, onClose, selectedDate, todoList, setTodoList, deleteTask, theme }) {
    return isVisible ? (
        <div className={`todo-modal rounded bg-${theme}`}>
            <Todo selectedDate={selectedDate} todoList={todoList} setTodoList={setTodoList} deleteTask={deleteTask} />
            <button onClick={onClose} className={`btn btn-${theme} shadow`}>Close</button>
        </div>
    ) : null;
}

export default TodoModal;