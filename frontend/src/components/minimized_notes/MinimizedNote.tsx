import MinimizedNoteTitle from "./MinimizedNoteTitle";
import MinimizedNoteContent from "./MinimizedNoteContent";

import "./MinimizedNote.css";

interface Props {
  id: string;
  title: string;
  content: string;
  isSelected: boolean;
  onSelect: (noteId: string) => void;
}

function MinimizedNote({ id, title, content, isSelected, onSelect }: Props) {
  return (
    <div className={`minimized-note ${isSelected ? "selected" : ""}`} onClick={() => onSelect(id)}>
      <MinimizedNoteTitle title={title} />
      <MinimizedNoteContent content={content} />
    </div>
  );
}

export default MinimizedNote;
