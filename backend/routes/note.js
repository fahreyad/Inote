import express from "express";
const router = express.Router();
import { fetchUser } from "../middleware/fetchUser.js";
import Note from "../models/Note.js";
import { body, validationResult } from "express-validator";
router.get("/", fetchUser, async (req, res) => {
  try {
    const id = req.user;
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
  }
});
router.post(
  "/",
  fetchUser,
  [body("title").notEmpty(), body("description").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tags } = req.body;

    try {
      const note = await Note.create({
        title: title,
        description: description,
        tags: tags,
        user: req.user.id,
      }).catch((err) => console.log(err));
      res.json(note);
    } catch (error) {
      console.error(error);
    }
  }
);
router.get("/:id", fetchUser, async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id).lean();
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    return res.status(500).json("server error");
  }
});
router.put("/:id", fetchUser, async (req, res) => {
  const { id } = req.params;
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      res.status(401).send("unauthenticate");
    }
    note = await Note.findByIdAndUpdate(id, { $set: newNote }, { new: true });

    res.json({ note });
  } catch (error) {
    return res.status(500).json({ msg: "server error", error: error.message });
  }
});
router.delete("/:id", fetchUser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      res.status(401).send("unauthenticate");
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ msg: "Successfully deleted notes", note: note });
  } catch (error) {
    return res.status(500).json({ msg: "server error", error: error.message });
  }
});

export const noteRouter = router;
