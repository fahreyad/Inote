import React, { useContext, useRef, useState } from "react";
import { NoteContext } from "../context/noteContext";
import NoteItem from "./NoteItem";
import EditNote from "./EditNote";
const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, editNote } = context;
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tags: "",
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tags: currentNote.tags,
    });
  };
  const ref = useRef();
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editNote(note.id, note.title, note.description, note.tags);
  };
  return (
    <div className="row">
      <h2>Your Notes</h2>
      <EditNote
        ref={ref}
        note={note}
        onChange={onChange}
        handleSubmit={handleSubmit}
      />
      <div className="container">{notes.length === 0 && "No note found"}</div>
      {notes.map((note) => {
        return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
      })}
    </div>
  );
};

export default Notes;
