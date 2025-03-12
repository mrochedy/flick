import { Note } from "models";
import { FaTrash as DeleteIcon } from "react-icons/fa";

import "./NoteEditorToolbar.css";

interface Props {
  note: Note | null;
  onDelete: (noteId: number) => void;
}

function NoteEditorToolbar({ onDelete, note }: Props) {
  const handleDelete = () => {
    onDelete(note?.id || -1);
  };

  return (
    <div className="note-editor-toolbar">
      <div className="toolbar-icons">
        <button
          className="toolbar-icon delete-icon"
          title="Delete current note"
          onClick={handleDelete}
          disabled={!note}
        >
          <DeleteIcon size="1.2rem" />
        </button>
      </div>
    </div>
  );
}

export default NoteEditorToolbar;
