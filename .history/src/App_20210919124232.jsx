import React from "react";
import Note from "./components/Note";
const App = (props) => {
  const { notes } = props;

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
