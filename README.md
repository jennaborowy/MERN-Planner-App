# MERN Planner Project
This project was created for my web programming class in Spring 2024, in which we learned how to build a MERN (MongoDB, Express, React, Node) application.

## My app includes:
- a calendar, which was built using [FullCalendar](https://fullcalendar.io/docs) for React
- daily todo lists, which pop up in a modal when you click on a date in the calendar
  - check off tasks
  - uses CRUD operations
- task visibility from the calendar view
- toggleable light/dark modes

## What I would like to add in my free time (which is rare):
- Events (tasks covering more than one day)
- Tasks/Events having start/end times
- Users
- Reminders
- Alerts for conflicting events, with an option to keep both or fix conflict
- Naviagting to different months by means other than clicking arrows
- Side notes
- More themes
- An overall improvement to the UI

## Database Connection:
For my purposes, I used a MongoDB Atlas cluster. This contains an events collection and a todos collection

## To use:
If you clone this repo, you should:
- [Make](https://www.mongodb.com/docs/atlas/tutorial/create-new-cluster/?msockid=2b00b33a7b60689e15eaa7f57aa26956)/use a MongoDB cluster
- [Copy](https://www.mongodb.com/docs/manual/reference/connection-string/#:~:text=If%20you%20selected%20a%20tool%2C%20download%20the%20tool.,the%20connection%20string%20with%20the%20database%20user%27s%20credentials.?msockid=2b00b33a7b60689e15eaa7f57aa26956) your uri connection string
- Make a config.env file in the root directory with a MONGODB_URI variable, and assign your uri connection string to it
