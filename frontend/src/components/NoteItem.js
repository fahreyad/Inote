import React, { useContext } from "react";
import { NoteContext } from "../context/noteContext";
const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">
            {note.title}
            <i
              className="bi bi-pencil-square mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
            <i
              className="bi bi-trash3"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
          </h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text">Tags: {note.tags}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
