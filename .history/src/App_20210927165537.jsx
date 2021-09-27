import React, { useState, useEffect , useRef } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import NoteForm from "./components/NoteForm";
import login from "./services/login";
import { create, update, getAll, setToken } from "./services/notes";
import Togglable from "./components/Togglable";
import LoginForm from "./components/loginForm";
const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  //
  useEffect(() => {
    if (user) {
      console.log("Effect:");
      getAll().then((initialNotes) => {
        console.log("Promise fulfilled");
        setNotes(initialNotes);
      });
    }
  }, [user]);

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
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await login({
        username,
        password,
      });
      console.log(data);
      //setUser(data.user);
      window.localStorage.setItem("currentUser", JSON.stringify(data));
      setToken(data.token);
      console.log("token", data.token);
      setUsername("");
      setPassword("");
    } catch (err) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("currentUser");
    if (loggedUserJSON) {
      const data = JSON.parse(loggedUserJSON);
      setUser(data.user);
      setToken(data.token);
    }
  }, []);
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((err) => {
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

  const noteFormRef = useRef();
  console.log("ref,noteFormRef.current)
  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        handleLogin={handleLogin}
        setPassword={setPassword}
        setUsername={setUsername}
        username={username}
        password={password}
      />
    </Togglable>
  );

  const noteForm = () => (
    <Togglable buttonLabel="new note">
      <NoteForm ref= {noteFormRef}
          addNote={addNote}
          handleNoteChange={handleNoteChange}
          newNote={newNote}
        />
    </Togglable>
  );
  return (
    <div>
      <h1>Notes</h1>
      <h3>Current User:{user && user.username}</h3>
      {errorMessage && <Notification message={errorMessage} />}
       {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      }

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
      <Footer />
    </div>
  );
};;

export default App;
