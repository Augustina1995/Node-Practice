import Event from "../models/Event.js";
import Attendee from "../models/Attendee.js";

export async function addEvent(req, res) {
  const { name, date, location, description } = req.body;

  if (!name || !date || !location || !description) {
    return res.status(400).json({ error: "Details must be filled to proceed" });
  }

  try {
    const newEvent = new Event({
      name,
      date,
      location,
      description,
    });

    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (error) {
    console.log("Error saving new event", error);

    res.status(500).json({ error: "Error occured while adding event" });
  }
}

export async function getEvents(req, res) {
  const { page, amount, eventName } = req.query;

  try {
    // let query = {};
    // Filtering event by name
    // This one is a bit complex
    // if (eventName) {
    //   query.name = { $regex: eventName, $options: "i" };
    // }

    // Using this for simplicity

    const events = await Event.find({ name: eventName })
      .select("-__v")
      .sort({ name: 1 })
      .limit(amount)
      .skip(amount * (page - 1));

    res.json(events);
  } catch (error) {
    console.log("Error fetching events", error);
    res.status(500).json({ error: "Error occured while fetching events" });
  }
}

export async function updateEventById(req, res) {
  const { id } = req.params;
  const { name, date, location, description } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  if (!name && !date && !location && !description) {
    return res
      .status(400)
      .json({ error: "At least one field is required to update details" });
  }

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (name) {
      event.name = name;
    }
    if (date) {
      event.date = date;
    }
    if (location) {
      event.location = location;
    }
    if (description) {
      event.description = description;
    }

    await event.save();

    res.status(200).json(event);
  } catch (error) {
    console.log("Error updating event", error);

    res
      .status(500)
      .json({ error: "Error occured while updating event details" });
  }
}

export async function deleteEventById(req, res) {
  const { id } = req.params;

  try {
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log("Error deleting event", error);
    res.status(500).json({ error: "Error occured while deleting event" });
  }
}

export async function addAttendeeToEvent(req, res) {
  const { eventId, attendeeId } = req.params;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const attendee = await Attendee.findById(attendeeId);

    if (!attendee) {
      return res.status(404).json({ error: "Attendee not found" });
    }

    event.attendee.push(attendee);
    await event.save();

    res.status(200).json(event);
  } catch (error) {
    console.log("Error adding attendee to event", error);
    res
      .status(500)
      .json({ error: "Error occured while adding attende to event" });
  }
}

export async function getEventWithAttendees(req, res) {
  const { id } = req.params;

  try {
    const event = await Event.findById(id).populate("attendee");

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.log("Error fetching event with attendees");
    res
      .status(500)
      .json({ error: "Error occured while fetching event with attendees" });
  }
}

export async function removeAttendeeFromEvent(req, res) {
  const { eventId, attendeeId } = req.params;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (!event.attendee.includes(attendeeId)) {
      return res.status(404).json({ error: "Attendee not found in the event" });
    }

    event.attendee = event.attendee.filter(
      (id) => id.toString() !== attendeeId
    );
    await event.save();

    res
      .status(200)
      .json({ message: "Attendee removed from event successfully" });
  } catch (error) {
    console.log("Error removing attendee from event", error);
    res
      .status(500)
      .json({ error: "Error occured while removing attendee from event" });
  }
}