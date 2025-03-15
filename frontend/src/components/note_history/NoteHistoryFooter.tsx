import { NoteHistory } from "models";

import "./NoteHistoryFooter.css";

interface Props {
  history: NoteHistory[];
  selectedVersionId: string;
  onRestoreVersion: (title: string, content: string) => void;
  onClose: () => void;
}

function NoteHistoryFooter({ history, selectedVersionId, onRestoreVersion, onClose }: Props) {
  const handleRestoreVersion = () => {
    const selectedVersion = history.find((v) => v.id === selectedVersionId);
    if (selectedVersion) {
      onRestoreVersion(selectedVersion.title, selectedVersion.content);
      onClose();
    }
  };

  return (
    <div className="note-history-footer">
      <button
        className="restore-version-button"
        onClick={handleRestoreVersion}
        disabled={!selectedVersionId || selectedVersionId === history[0].id}
      >
        Restore this version
      </button>
    </div>
  );
}

export default NoteHistoryFooter;
