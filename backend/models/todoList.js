//todoList.js 
  
const mongoose = require('mongoose'); 
  
const todoSchema = new mongoose.Schema({ 
    task: { 
        type: String, 
        required: true, 
    }, 
    completed: { 
        type: Boolean, 
        required: true, 
    }, 
    date: {
        type: Date,
        required: true,
    }
}); 
  
  
const todoList = mongoose.model("todo", todoSchema); 
  
module.exports = todoList;