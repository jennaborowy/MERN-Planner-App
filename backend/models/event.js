const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    todo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "todoList",
        required: true
    },
    start: { 
        type: Date, 
        required: true 
    },
    end: { 
        type: Date, 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    } // Optional, if you want to link to a user
});

const event = mongoose.model('event', eventSchema);

module.exports = event;
