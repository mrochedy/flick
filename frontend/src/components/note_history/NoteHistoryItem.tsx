import { NoteHistory } from "models";

import "./NoteHistoryItem.css";

interface Props {
  version: NoteHistory;
  isSelected: boolean;
  isCurrent: boolean;
  onSelect: (version: NoteHistory) => void;
}

function NoteHistoryItem({ version, isSelected, isCurrent, onSelect }: Props) {
  return (
    <div
      key={version.id}
      className={`note-history-item ${isCurrent ? "current" : ""} ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(version)}
    >
      <div className="note-history-item-title">{version.title}</div>
      <div className="note-history-item-date">{new Date(version.versionDate).toLocaleString()}</div>
    </div>
  );
}

export default NoteHistoryItem;
