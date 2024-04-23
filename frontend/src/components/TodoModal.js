import axios from "axios"; 
import React, { useState } from "react"; 
import { Todo } from "./Todo";

function TodoModal({ isVisible, onClose, onSave, selectedDate }) {
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSave = () => {
        onSave({
            descriptiuon: description,
            start: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), parseInt(startTime)),
            end: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), parseInt(endTime))
        });
    };

    return isVisible ? (
        <div style={{ position: 'fixed', top: '20%', left: '30%', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
            <h2>Add Event</h2>
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Start Time (hour)"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
            />
            <input
                type="number"
                placeholder="End Time (hour)"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Close</button>
        </div>
    ) : null;
}

export default TodoModal;