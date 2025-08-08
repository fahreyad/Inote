import mongoose from "mongoose";
const { Schema } = mongoose;
const NoteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    default: "general",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Note = mongoose.model("note", NoteSchema);
export default Note;
