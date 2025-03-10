import { Note } from "models";
import MinimizedNote from "./MinimizedNote";

interface Props {
  notes: Note[];
}

function MinimizedNotesList({ notes }: Props) {
  return (
    <div>
      {notes.map((note) => (
        <MinimizedNote key={note.id} title={note.title} content={note.content} />
      ))}
    </div>
  );
}

export default MinimizedNotesList;
