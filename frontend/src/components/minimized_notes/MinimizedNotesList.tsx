import { Note } from "models";

import MinimizedNote from "./MinimizedNote";

import "./MinimizedNotesList.css";

interface Props {
  notes: Note[];
  selectedNoteId: string | null;
  onNoteSelect: (noteId: string) => void;
}

function MinimizedNotesList({ notes, selectedNoteId, onNoteSelect }: Props) {
  return (
    <div className="minimized-notes-list">
      {notes.length === 0 ? (
        <div className="no-notes-message">No notes available</div>
      ) : (
        notes.map((note) => (
          <MinimizedNote
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            isSelected={note.id === selectedNoteId}
            onSelect={onNoteSelect}
          />
        ))
      )}
    </div>
  );
}

export default MinimizedNotesList;
