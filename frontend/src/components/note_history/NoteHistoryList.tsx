import { NoteHistory } from "models";

import NoteHistoryItem from "./NoteHistoryItem";

import "./NoteHistoryList.css";

interface Props {
  history: NoteHistory[];
  selectedVersionId: string;
  onSelectVersion: (version: NoteHistory) => void;
}

function NoteHistoryList({ history, selectedVersionId, onSelectVersion }: Props) {
  return (
    <div className="note-history-list">
      {history.map((version) => (
        <NoteHistoryItem
          key={version.id}
          version={version}
          isSelected={version.id === selectedVersionId}
          isCurrent={version.id === history[0].id}
          onSelect={onSelectVersion}
        />
      ))}
    </div>
  );
}

export default NoteHistoryList;
