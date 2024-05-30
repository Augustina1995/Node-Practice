import express from "express";
import {
  addAttendeeToEvent,
  addEvent,
  deleteEventById,
  getEventWithAttendees,
  getEvents,
  removeAttendeeFromEvent,
  updateEventById,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/events", getEvents);

router.get("/events/:id", getEventWithAttendees);

router.post("/events", addEvent);

router.put("/events/:id", updateEventById);

router.post("/events/:eventId/attendees/:attendeeId", addAttendeeToEvent);

router.delete(
  "/events/:eventId/attendees/:attendeeId",
  removeAttendeeFromEvent
);

router.delete("/events/:id", deleteEventById);

export default router;