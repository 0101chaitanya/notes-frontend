import React, { useState } from "react";
import Note from "./components/Note";
const App = (props) => {
  const [notes, setNotes] = useState(props.notes);

  const addNote = (e) => {
    e.preventDefault();
    console.log("button clicked", e.target);
  };
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
