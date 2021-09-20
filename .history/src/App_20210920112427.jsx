import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import { create, Update, getALl } from "./services/notes";
const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("Effect:");
    getAll().then((res) => {
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

    create(noteObject).then((res) => {
      console.log(res);
      setNotes(notes.concat(res.data));
      setNewNote("");
    });
  };
  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const toggleImportanceOf = (id) => {
    console.log(`Importance of note ${id} needs to be toggled`);
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    Update(id, changedNote).then((response) => {
      setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
    });
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
          <Note
            key={item.id}
            toggleImportanceOf={toggleImportanceOf}
            note={item}
          />
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
