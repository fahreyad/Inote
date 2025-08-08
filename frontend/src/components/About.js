import React, { useContext } from "react";
import { NoteContext } from "../context/noteContext";
const About = () => {
  const { notes, updateState } = useContext(NoteContext);

  return (
    <div>
      Hi my name is {notes.name} and my class is {notes.class};
      <button onClick={updateState}>Click me</button>
    </div>
  );
};

export default About;
