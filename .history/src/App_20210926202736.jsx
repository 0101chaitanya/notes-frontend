import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import login from "./services/login";
import { create, update, getAll } from "./services/notes";
const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState(""); 
   const [user, setUser] = useState("");
  useEffect(() => {
    console.log("Effect:");
    getAll().then((initialNotes) => {
      console.log("Promise fulfilled");
      setNotes(initialNotes);
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

    create(noteObject).then((returnedNotes) => {
      setNotes(notes.concat(returnedNotes));
      setNewNote("");
    });
  };
  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };
 const handleLogin = async(event) => {
   event.preventDefault();
  // console.log("logging in with", username, password);
 
try {
const user = login({
  username, password,
})
console.log("user",user)
 setUser(user);
 setUsername("");
 setPassword("");
}catch(err) {
  setErrorMessage("Wrong credentials");
  setTimeout(() => {
    setErrorMessage(null);
  }, 5000);
}
};
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((err) => {
        //alert(`The note "${note.content}" was already deleted from server`);
        setErrorMessage(
          `The note "${note.content}" was already deleted from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((item) => item.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  return (
    <div>
      <h1>Notes</h1>
      <h3>Current User:{user.username}</h3>
      {errorMessage && <Notification message={errorMessage} />}

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>

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
      <Footer />
    </div>
  );
};

export default App;
