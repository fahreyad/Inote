import { createContext, useState, useEffect } from "react";
const NoteContext = createContext();

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const AUTH_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg4YjUyODdiY2EwYTFhZjM5OWM0MTg2In0sImlhdCI6MTc1Mzk2MTE1Nn0.fg3rchDXWrt5GzqmdWGQyV4P1tG7IqhNo6pytCCCNGQ";
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    allNote();
  }, []);

  const allNote = async () => {
    const result = await fetch(`${host}/api/notes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": AUTH_TOKEN,
      },
    });
    const json = await result.json();
    setNotes(json);
  };

  const addNote = async (title, description, tags) => {
    const result = await fetch(`${host}/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": AUTH_TOKEN,
      },
      body: JSON.stringify({
        title,
        description,
        tags,
      }),
    });
    const json = await result.json();
    setNotes([...notes, json]);
  };

  const editNote = async (id, title, description, tags) => {
    const result = await fetch(`${host}/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": AUTH_TOKEN,
      },
      body: JSON.stringify({
        title,
        description,
        tags,
      }),
    });
    const json = await result.json();
    console.log(json);

    const newnote = JSON.parse(JSON.stringify(notes));

    newnote.map((note) => {
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tags = tags;
      }
      return note;
    });

    setNotes(newnote);
  };
  const deleteNote = async (id) => {
    const result = await fetch(`${host}/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": AUTH_TOKEN,
      },
    });
    const json = await result.json();
    console.log(json);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });

    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, allNote, addNote, editNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export { NoteState, NoteContext };
