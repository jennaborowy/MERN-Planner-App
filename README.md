# MERN Planner Project
This project is my first MERN (MongoDB, Express, React, Node) application. I chose to make a web planner.

## My app includes:
- a calendar, which was built using [FullCalendar](https://fullcalendar.io/docs) for React
- daily todo lists, which pop up in a modal when you click on a date in the calendar
  - check off tasks
  - uses CRUD operations
- task visibility from the calendar view
- toggleable light/dark modes

## What I would like to add in my free time:
- events (tasks covering more than one day)
- tasks/events having start/end times
- users
- reminders
- alerts for conflicting events, with an option to keep both or fix conflict
- naviagting to different months by means other than clicking arrows
- side notes
- more themes
- an overall improvement to the UI

## Database Connection:
For my purposes, I used a MongoDB Atlas cluster. This contains an events collection and a todos collection.

## To use:
### Prerequisites
- [install](https://nodejs.org/en) Node and NPM if you don't have them
- [make](https://www.mongodb.com/docs/atlas/tutorial/create-new-cluster/?msockid=2b00b33a7b60689e15eaa7f57aa26956)/use a MongoDB cluster
### Steps
- clone this repo
- inside the project directory, navigate to the "frontend" directory
- run ```npm install```
- leave the "frontend" directory to go to the "backend" directory
- run ```npm install```
- [copy](https://www.mongodb.com/docs/manual/reference/connection-string/#:~:text=If%20you%20selected%20a%20tool%2C%20download%20the%20tool.,the%20connection%20string%20with%20the%20database%20user%27s%20credentials.?msockid=2b00b33a7b60689e15eaa7f57aa26956) your uri connection string from your MongoDB cluster
- make a config.env file in the root directory with a MONGODB_URI variable, and assign your uri connection string to it

Now we should be able to start the app!
### Running the App
- go back into the backend directory
- run ```npm start```
- open another terminal
- go to the frontend directory
- run ```npm start```
  
The app should open in your browser at localhost:3000!
