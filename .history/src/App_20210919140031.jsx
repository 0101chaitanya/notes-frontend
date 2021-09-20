import React, { useState } from "react";
const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("a new note");
  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    setNotes(notes.concat(noteObject));
    setNewNote("");
  };
  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
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
        <input onChange={handleNoteChange} value={newNote} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
