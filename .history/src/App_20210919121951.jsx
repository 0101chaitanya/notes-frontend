import React from "react";

const App = (props) => {
  const { notes } = props;

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((item) => (
          <li>{item.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
