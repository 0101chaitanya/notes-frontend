import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";
const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("Effect:");
    axios.get("http://localhost:3001/notes").then((res) => {
      console.log("Promise fulfilled");
      setNotes(res.data);
    });
  }, []);
  console.log("render", notes.length, "notes");

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    axios.post("http://localhost:3001/notes", noteObject).then((res) => {
      console.log(res);
      setNotes(notes.concat(res.data));
      setNewNote("");
    });
  };
  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const toggleImportance = (id) => {
    console.log("Importance of " + id + "needs to be toggled");
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((item) => (
          <Note key={item.id} note={item} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          onChange={handleNoteChange}
          toggleImportance={toggleImportance}
          value={newNote}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
