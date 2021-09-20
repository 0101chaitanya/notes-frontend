import React from "react";

const Note = ({ note, toggleImportanceOf }) => {
  console.log(toggleImportanceOf);
  const label = note.important ? "make not important" : "make important";
  return (
    <li>
      {note.content}
      <button onClick={toggleImportanceOf}>{label}</button>
    </li>
  );
};

export default Note;
