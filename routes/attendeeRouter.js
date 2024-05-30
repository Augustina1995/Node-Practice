import express from "express";
import { addAttendee, deleteAttendeeById, getAttendees, updateAttendeeById } from "../controllers/attendeeController.js";

const router = express.Router();

router.get("/attendees", getAttendees);

router.post("/attendees", addAttendee);

router.put("/attendees/:id", updateAttendeeById);

router.delete("/attendees/:id", deleteAttendeeById);

export default router;