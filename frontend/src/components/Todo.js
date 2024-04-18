import axios from "axios"; 
import React from "react"; 
import { useEffect, useState, useContext } from "react"; 
import { ThemeContext, ThemeProvider } from "./ThemeContext";

function Todo() { 
    const [todoList, setTodoList] = useState([]); 
    const [editableId, setEditableId] = useState(null); 
    const [editedTask, setEditedTask] = useState(""); 
    const [editedStatus, setEditedStatus] = useState(""); 
    const [newTask, setNewTask] = useState(""); 
    const [newStatus, setNewStatus] = useState(""); 
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
            setEditedStatus(rowData.status); 
        } else { 
            setEditableId(null); 
            setEditedTask(""); 
            setEditedStatus(""); 
        } 
    }; 
  
  
    // Function to add task to the database 
    const addTask = (e) => {
        e.preventDefault();
        if (!newTask || !newStatus) {
            alert('All fields must be filled out.');
            return;
        }

        axios
            .post('http://127.0.0.1:3001/addTodoList', { task: newTask, status: newStatus })
            .then((res) => {
                console.log(res);

                // Update the task list state instead of reloading the page
                // Fetch the updated task list from the server
                axios.get('http://127.0.0.1:3001/getTodoList').then((result) => {
                    setTodoList(result.data);
                }).catch(err => console.log(err));

                // Reset the form inputs
                setNewTask('');
                setNewStatus('');
            })
            .catch((err) => console.log(err));
    };
  
    // Function to save edited data to the database 
    const saveEditedTask = (id) => { 
        const editedData = { 
            task: editedTask, 
            status: editedStatus, 
        }; 
  
        // If the fields are empty 
        if (!editedTask || !editedStatus ) { 
            alert("All fields must be filled out."); 
            return; 
        } 
  
        // Updating edited data to the database through updateById API 
        axios.post('http://127.0.0.1:3001/updateTodoList/' + id, editedData) 
            .then(result => { 
                console.log(result); 
                setEditableId(null); 
                setEditedTask(""); 
                setEditedStatus(""); 
                window.location.reload(); 
            }) 
            .catch(err => console.log(err)); 
    } 
  
  
    // Delete task from database 
    const deleteTask = (id) => { 
        axios.delete('http://127.0.0.1:3001/deleteTodoList/' + id) 
            .then(result => { 
                console.log(result); 
                window.location.reload(); 
            }) 
            .catch(err => 
                console.log(err) 
            ) 
    } 
  
    return ( 
        <div className="container mt-5"> 
            <div className="row"> 
                <div className="col-md-7"> 
                    <h2 className="text-center">Todo List</h2> 
                    <div className="table-responsive"> 
                        <table className={`table table-bordered rounded`}> 
                            <thead className={{theme}}> 
                                <tr> 
                                    <th>Task</th> 
                                    <th>Status</th> 
                                    <th>Actions</th> 
                                </tr> 
                            </thead> 
                            {Array.isArray(todoList) ? ( 
                                <tbody className="table-group-divider"> 
                                    {todoList.map((data) => ( 
                                        <tr key={data._id}> 
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
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        value={editedStatus} 
                                                        onChange={(e) => setEditedStatus(e.target.value)} 
                                                    /> 
                                                ) : ( 
                                                    data.status 
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
                        <div className="mb-3"> 
                            <label>Status</label> 
                            <input 
                                className="form-control"
                                type="text"
                                placeholder="Enter Status"
                                onChange={(e) => setNewStatus(e.target.value)} 
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