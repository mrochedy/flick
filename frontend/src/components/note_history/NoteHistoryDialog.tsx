import { useState, useEffect } from "react";

import { Note, NoteHistory, RawNoteHistory, convertRawNoteHistory } from "models";

import NoteHistoryHeader from "../note_history/NoteHistoryHeader";
import NoteHistoryPreview from "../note_history/NoteHistoryPreview";
import NoteHistoryList from "../note_history/NoteHistoryList";
import NoteHistoryFooter from "../note_history/NoteHistoryFooter";
import db from "db";

import "./NoteHistoryDialog.css";

interface Props {
  note: Note;
  isOpen: boolean;
  onClose: () => void;
  onRestoreVersion: (title: string, content: string) => void;
}

function NoteHistoryDialog({ note, isOpen, onClose, onRestoreVersion }: Props) {
  const [history, setHistory] = useState<NoteHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && note) {
      setLoading(true);
      setError(null);

      db.get(`/notes/${note.id}/history`)
        .then((res) => {
          const historyItems = res.data.map((item: RawNoteHistory) => convertRawNoteHistory(item));
          setHistory(historyItems);
          setSelectedVersionId(historyItems[0].id);
        })
        .catch((err) => {
          console.error("Error fetching note history:", err);
          setError("Failed to load note history. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen, note]);

  const handleSelectVersion = (version: NoteHistory) => {
    setSelectedVersionId(version.id);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="note-history-dialog-overlay" onClick={handleOverlayClick}>
      <div className="note-history-dialog">
        <NoteHistoryHeader />
        <div className="note-history-dialog-body">
          {loading ? (
            <div className="loading">Loading history...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              <NoteHistoryList
                history={history}
                selectedVersionId={selectedVersionId || ""}
                onSelectVersion={handleSelectVersion}
              />
              <NoteHistoryPreview history={history} selectedVersionId={selectedVersionId || ""} />
            </>
          )}
        </div>
        <NoteHistoryFooter
          history={history}
          selectedVersionId={selectedVersionId || ""}
          onRestoreVersion={onRestoreVersion}
          onClose={onClose}
        />
      </div>
    </div>
  );
}

export default NoteHistoryDialog;
