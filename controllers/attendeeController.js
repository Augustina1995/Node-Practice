import Attendee from "../models/Attendee.js";

export async function addAttendee(req, res) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    const newAttendee = new Attendee({
      name,
      email,
    });

    await newAttendee.save();

    res.status(201).json(newAttendee);
  } catch (error) {
    console.log("Error saving new attendee", error);

    res.status(500).json({ error: "Error occured while adding attendee" });
  }
}

export async function getAttendees(req, res) {
  try {
    const attendees = await Attendee.find();
    res.status(200).json(attendees);
  } catch (error) {
    console.log("Error fetching attendees", error);
    res.status(500).json({ error: "Error occured while fetching attendees" });
  }
}

export async function updateAttendeeById(req, res) {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  if (!name && !email) {
    return res
      .status(400)
      .json({ error: "At least one field is required to update details" });
  }

  try {
    const attendee = await Attendee.findById(id);

    if (!attendee) {
      return res.status(404).json({ error: "Attendee not found" });
    }

    if (name) {
      attendee.name = name;
    }
    if (email) {
      attendee.email = email;
    }

    await attendee.save();

    res.status(200).json(attendee);
  } catch (error) {
    console.log("Error updating attendee", error);

    res
      .status(500)
      .json({ error: "Error occured while updating attendee details" });
  }
}

export async function deleteAttendeeById(req, res) {
  const { id } = req.params;

  try {
    const attendee = await Attendee.findByIdAndDelete(id);

    if (!attendee) {
      return res.status(404).json({ error: "Attendee not found" });
    }

    res.json({ message: "Attendee deleted successfully" });
  } catch (error) {
    console.log("Error deleting attendee", error);
    res.status(500).json({ error: "Error occured while deleting attendee" });
  }
}
