import express from "express";
import { addAttendeeToEvent, addEvent, deleteEventById, getEvents, updateEventById } from "../controllers/eventController.js";

const router = express.Router();

router.get("/events", getEvents);

router.get("/events/:id");

router.post("/events", addEvent);

router.put("/events/:id", updateEventById);

router.post("/events/:eventId/attendees/:attendeeId", addAttendeeToEvent);

router.delete("/events/:id/attendees/:id");

router.delete("/events/:id", deleteEventById);

export default router;