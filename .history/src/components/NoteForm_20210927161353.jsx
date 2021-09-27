const NoteForm = ({ addNote, handleNoteChange, newNote }) => {
  return (
    <form onSubmit={addNote}>
      <input onChange={handleNoteChange} value={newNote} />
      <button type="submit">Save</button>
    </form>
  );
};
export default NoteForm;