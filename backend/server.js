//server.js 
  
require('dotenv').config({ path: "/MERN-webdev-project/config.env" });
const express = require('express') 
const mongoose = require('mongoose') 
const cors = require('cors') 
const TodoModel = require("./models/todoList")
const Event = require("./models/event")
const uri = process.env.MONGODB_URI; // isn't working

var app = express(); 
app.use(cors()); 
app.use(express.json()); 

console.log(uri); // the string is undefined

// Connect to your MongoDB database (replace with your database URL) 
mongoose.connect("mongodb+srv://JennaBorowy:8jMerL0w@merncluster.yrwfeow.mongodb.net/?retryWrites=true&w=majority&appName=MERNCluster"); 

// Check for database connection errors 
mongoose.connection.on("error", (error) => { 
    console.error("MongoDB connection error:", error); 
}); 
  
// Get saved tasks from the database 
app.get("/getTodoList", (req, res) => { 
    TodoModel.find({}) 
        .then((todoList) => res.json(todoList)) 
        .catch((err) => res.json(err)) 
}); 
  
// Add new task to the database 
app.post("/addTodoList", (req, res) => { 
    TodoModel.create({ 
        task: req.body.task, 
        completed: false, 
        deadline: req.body.deadline,  
    }) 
        .then((todo) => res.json(todo)) 
        .catch((err) => res.json(err)); 
}); 
  
// Update task fields 
app.post("/updateTodoList/:id", (req, res) => { 
    const id = req.params.id; 
    const { task, completed, deadline } = req.body;
    const updateData = { 
        task,
        completed,
        deadline,  
    }; 

    TodoModel.findByIdAndUpdate(id, updateData, { new: true }) 
        .then((todo) => res.json(todo)) 
        .catch((err) => res.json(err)); 
}); 
  
// Delete task from the database 
app.delete("/deleteTodoList/:id", (req, res) => { 
    const id = req.params.id; 
    TodoModel.findByIdAndDelete({ _id: id }) 
        .then((todo) => res.json(todo)) 
        .catch((err) => res.json(err)); 
        
}); 

// Get events
app.post("/addEvent", (req, res) => { 
    EventModel.create({ 
        description: req.body.task, 
        start: false, 
        end: req.body.deadline,  
    }) 
        .then((event) => res.json(event)) 
        .catch((err) => res.json(err)); 
}); 
  
// Update event
app.post("/updateEvent/:id", (req, res) => { 
    const id = req.params.id; 
    const { description, start, end } = req.body;
    const updateData = { 
        description, start, end  
    }; 

    EventModel.findByIdAndUpdate(id, updateData, { new: true }) 
        .then((event) => res.json(event)) 
        .catch((err) => res.json(err)); 
}); 
  
// Delete event
app.delete("/deleteEvent/:id", (req, res) => { 
    const id = req.params.id; 
    EventModel.findByIdAndDelete({ _id: id }) 
        .then((event) => res.json(event)) 
        .catch((err) => res.json(err)); 
        
}); 

app.listen(3001, () => { 
    console.log('Server running on 3001'); 
}); 