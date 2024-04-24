import { useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";  
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

function Calendar({ handleDateClick, tasks, setTasks }) {
    // fetch all TodoLists 
    useEffect(() => {
        axios.get("http://127.0.0.1:3001/getTodoList")
        .then(res => {
            // Set the tasks from res.data
            setTasks(res.data);
        })
        .catch(error => {
            console.error('Error fetching todo lists:', error);
        });
    }, [tasks]); // re-renders when tasks is updated
    
    const renderEvents = () => {
        return tasks.map(task => ({
            title: task.task,
            start: task.date,
            end: task.date,
            allDay: true,
        }));
    }
    
    return (
        <div className="container mt-5">
            <h2 className="text-center">Planner</h2>
            <FullCalendar
                plugins={ [dayGridPlugin, interactionPlugin, timeGridPlugin, bootstrap5Plugin]}
                themeSystem="bootstrap5"
                initialView="dayGridMonth"
                navLinks={true}
                dateClick={handleDateClick}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={renderEvents()}
            />
            
            
        </div>
    );
}

export default Calendar;