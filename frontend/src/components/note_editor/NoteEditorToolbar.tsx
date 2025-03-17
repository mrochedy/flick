import { useState } from "react";
import { FaTrash as DeleteIcon } from "react-icons/fa";
import { LuClipboardList as HistoryIcon } from "react-icons/lu";

import { Note } from "models";
import { NoteHistoryDialog } from "components";

import "./NoteEditorToolbar.css";

interface Props {
  note: Note | null;
  onDelete: (noteId: string) => void;
  onRestoreVersion: (title: string, content: string) => void;
}

function NoteEditorToolbar({ onDelete, onRestoreVersion, note }: Props) {
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);

  const handleDelete = () => {
    onDelete(note?.id || "");
  };

  const handleHistoryClick = () => {
    setIsHistoryDialogOpen(true);
  };

  const handleHistoryClose = () => {
    setIsHistoryDialogOpen(false);
  };

  return (
    <div className="note-editor-toolbar">
      <div className="toolbar-icons">
        <button
          className="toolbar-icon"
          title="See note versions history"
          disabled={!note}
          onClick={handleHistoryClick}
        >
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

      {note && (
        <NoteHistoryDialog
          note={note}
          isOpen={isHistoryDialogOpen}
          onClose={handleHistoryClose}
          onRestoreVersion={onRestoreVersion}
        />
      )}
    </div>
  );
}

export default NoteEditorToolbar;
