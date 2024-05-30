Creating a Web Application with Node.js and Express
Objective
Your task is to create a simple web application using Node.js and Express, integrated with either PostgreSQL or MongoDB as the database. The application should manage a collection of events and attendees, including routes for basic CRUD operations and query parameters to filter results.

Database Setup
You can choose to use either PostgreSQL or MongoDB for the database. If using PostgreSQL, create two tables: Events and Attendees. If using MongoDB, create two collections: Events and Attendees.

Events Table/Collection
Fields: id, name, date, location, description
Attendees Table/Collection
Fields: id, name, email, eventId (which references the id in the Events table/collection)
Routes
Events
GET /events: Fetch all events. You should be able to filter by event name and set a limit of returned events.
GET /events/:id: Fetch a single event by ID and all its attendees.
POST /events: Add a new event.
PUT /events/:id: Update an event by ID.
POST /events/:eventId/attendees/:attendeeId: Add an attendee to an event.
DELETE /events/:eventId/attendees/:attendeeId: Remove an attendee from an event.
DELETE /events/:id: Delete an event by ID.
Attendees
GET /attendees: Fetch all attendees.
POST /attendees: Add a new attendee.
PUT /attendees/:id: Update an attendee by ID.
DELETE /attendees/:id: Delete an attendee by ID.
Application Logic
Ensure proper error handling for routes.
Implement validation for the data being inserted or updated.