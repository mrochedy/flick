import { Note } from "models";
import MinimizedNote from "./MinimizedNote";
import "./MinimizedNotesList.css";

interface Props {
  notes: Note[];
}

function MinimizedNotesList({ notes }: Props) {
  return (
    <div className="minimized-notes-list">
      {notes.length === 0 ? (
        <div className="no-notes-message">No notes available</div>
      ) : (
        notes.map((note) => <MinimizedNote key={note.id} title={note.title} content={note.content} />)
      )}
    </div>
  );
}

export default MinimizedNotesList;
