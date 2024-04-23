import axios from "axios"; 
import React from "react"; 
import { useEffect, useState, useContext } from "react"; 
import { ThemeContext } from "./ThemeContext";

function Todo() { 
    const [todoList, setTodoList] = useState([]); 
    const [editableId, setEditableId] = useState(null); 
    const [editedTask, setEditedTask] = useState(""); 
    const [newTask, setNewTask] = useState(""); 
    const { theme } = useContext(ThemeContext);
    
    // Fetch tasks from database 
    useEffect(() => { 
        axios.get('http://127.0.0.1:3001/getTodoList') 
            .then(result => { 
                setTodoList(result.data) 
            }) 
            .catch(err => console.log(err)) 
    }, []) 
  
    // Function to toggle the editable state for a specific row 
    const toggleEditable = (id) => { 
        const rowData = todoList.find((data) => data._id === id); 
        if (rowData) { 
            setEditableId(id); 
            setEditedTask(rowData.task); 
            
        } else { 
            setEditableId(null); 
            setEditedTask(""); 
            
        } 
    }; 
  
  
    // Function to add task to the database 
    const addTask = (e) => {
        e.preventDefault();
        if (!newTask) {
            alert('All fields must be filled out.');
            return;
        }

        axios
            .post('http://127.0.0.1:3001/addTodoList', { task: newTask, completed: false })
            .then((res) => {
                console.log(res);

                // Update the task list state instead of reloading the page
                // Fetch the updated task list from the server
                axios.get('http://127.0.0.1:3001/getTodoList').then((result) => {
                    setTodoList(result.data);
                }).catch(err => console.log(err));

                // Reset the form inputs
                setNewTask('');
            })
            .catch((err) => console.log(err));
    };
  
    // Function to save edited data to the database 
    const saveEditedTask = (id) => { 
        const editedData = { 
            task: editedTask,  
        }; 
  
        // If the fields are empty 
        if (!editedTask) { 
            alert("All fields must be filled out."); 
            return; 
        } 
  
        // Updating edited data to the database through updateById API 
        axios.post('http://127.0.0.1:3001/updateTodoList/' + id, editedData) 
            .then(result => { 
                console.log(result); 
                setEditableId(null); 
                setEditedTask(""); 
            }) 
            .catch(err => console.log(err)); 
    } 
  
  
    // Delete task from database 
    const deleteTask = (id) => { 
        axios.delete('http://127.0.0.1:3001/deleteTodoList/' + id) 
            .then(result => { 
                console.log(result);
                // Update the local todo list to remove the deleted task
                setTodoList(todoList.filter(task => task._id !== id)); 
                
            }) 
            .catch(err => 
                console.log(err) 
            ) 
    } 

    // Function to handle checkbox change
    const handleCheckboxChange = (id, completed) => {
        axios.post('http://127.0.0.1:3001/updateTodoList/' + id, { completed })
            .then(response => {
                console.log('Task updated:', response.data);
                // Update the local todo list with the updated task
                const updatedTodoList = todoList.map(task => {
                    if (task._id === id) {
                        return { ...task, completed };
                    } else {
                        return task;
                    }
                });
                setTodoList(updatedTodoList);
            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
    };

  
    return ( 
        <div className="container mt-5"> 
            <div className="row"> 
                <div className="col-md-7"> 
                    <h2 className="text-center">Todo List</h2> 
                    <div className="table-responsive"> 
                        <table className={`table table-bordered rounded`}> 
                            <thead className={{theme}}> 
                                <tr> 
                                    <th></th>
                                    <th>Task</th>
                                    <th>Actions</th> 
                                </tr> 
                            </thead> 
                            {Array.isArray(todoList) ? ( 
                                <tbody className="table-group-divider"> 
                                    {todoList.map((data) => ( 
                                        <tr key={data._id}> 
                                            <td> 
                                                <input 
                                                    type="checkbox"
                                                    checked={data.completed}
                                                    onChange={(e) => handleCheckboxChange(data._id, e.target.checked)}
                                                />
                                            </td>
                                            
                                            <td> 
                                                {editableId === data._id ? ( 
                                                    <input 
                                                        type="text"
                                                        className={`form-control input ${theme}`} 
                                                        value={editedTask} 
                                                        onChange={(e) => setEditedTask(e.target.value)} 
                                                    /> 
                                                ) : ( 
                                                    data.task 
                                                )} 
                                            </td> 
                                            

                                            <td> 
                                                {editableId === data._id ? ( 
                                                    <button className="btn btn-success btn-sm" onClick={() => saveEditedTask(data._id)}> 
                                                        Save 
                                                    </button> 
                                                ) : ( 
                                                    <button className="btn btn-primary btn-sm" onClick={() => toggleEditable(data._id)}> 
                                                        Edit 
                                                    </button> 
                                                )} 
                                                <button className="btn btn-danger btn-sm ml-1" onClick={() => deleteTask(data._id)}> 
                                                    Delete 
                                                </button> 
                                            </td> 
                                        </tr> 
                                    ))} 
                                </tbody> 
                            ) : ( 
                                <tbody> 
                                    <tr> 
                                        <td colSpan="4">Loading products...</td> 
                                    </tr> 
                                </tbody> 
                            )} 


                        </table> 
                    </div> 
                </div> 
                <div className="col-md-5"> 
                    <h2 className="text-center">Add Task</h2> 
                    <form className={`border border-${theme} rounded p-4`}> 
                        <div className="mb-3"> 
                            <label>Task</label> 
                            <input 
                                className="form-control"
                                type="text"
                                placeholder="Enter Task"
                                onChange={(e) => setNewTask(e.target.value)} 
                            /> 
                        </div> 
                        
                        <button onClick={addTask} className="btn btn-success btn-sm"> 
                            Add Task 
                        </button> 
                    </form> 
                </div> 

            </div> 
        </div> 
    )               
} 
export default Todo;