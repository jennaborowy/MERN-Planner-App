import FullCalendar from "@fullcalendar/react";  
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

function Calendar() {

    return (
        <div className="container mt-5">
            <h2 className="text-center">Planner</h2>
            <FullCalendar
                plugins={ [dayGridPlugin, interactionPlugin, timeGridPlugin, bootstrap5Plugin]}
                themeSystem="bootstrap5"
                initialView="dayGridMonth"
                navLinks={true}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
            />
        </div>
    );
}

export default Calendar;