import { MinimizedNoteContent, MinimizedNoteTitle } from "components";

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
