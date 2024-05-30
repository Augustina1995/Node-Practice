import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attendee: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendee",
    },
  ],
});

export default mongoose.model("Event", eventSchema);