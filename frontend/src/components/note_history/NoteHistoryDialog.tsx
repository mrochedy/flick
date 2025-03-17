import { useState, useEffect } from "react";

import { Note, NoteHistory, RawNoteHistory, convertRawNoteHistory } from "models";
import {
  NoteHistoryHeader,
  NoteHistoryPreview,
  NoteHistoryList,
  NoteHistoryFooter,
  ErrorDisplay,
  Loader,
} from "components";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && note) {
      setIsLoading(true);
      setError(null);

      db.get(`/notes/${note.id}/history`)
        .then((res) => {
          const historyItems = res.data.map((item: RawNoteHistory) => convertRawNoteHistory(item));
          setHistory(historyItems);
          setSelectedVersionId(historyItems[0].id);
        })
        .catch(() => {
          setError("Failed to load note history. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
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
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorDisplay message={error} />
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
