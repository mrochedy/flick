import { Note } from "models";
import { FaTrash as DeleteIcon } from "react-icons/fa";
import { LuClipboardList as HistoryIcon } from "react-icons/lu";

import "./NoteEditorToolbar.css";

interface Props {
  note: Note | null;
  onDelete: (noteId: string) => void;
}

function NoteEditorToolbar({ onDelete, note }: Props) {
  const handleDelete = () => {
    onDelete(note?.id || "");
  };

  return (
    <div className="note-editor-toolbar">
      <div className="toolbar-icons">
        <button className="toolbar-icon history-icon" title="See note versions history" disabled={!note}>
          <HistoryIcon size="1.4rem" />
        </button>
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
