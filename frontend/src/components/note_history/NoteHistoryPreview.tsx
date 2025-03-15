import { NoteHistory } from "models";

import "./NoteHistoryPreview.css";

interface Props {
  history: NoteHistory[];
  selectedVersionId: string;
}

function NoteHistoryPreview({ history, selectedVersionId }: Props) {
  return (
    <div className="note-history-preview">
      <div className="note-history-preview-title">{history.find((v) => v.id === selectedVersionId)?.title}</div>
      <div className="note-history-preview-content">{history.find((v) => v.id === selectedVersionId)?.content}</div>
    </div>
  );
}

export default NoteHistoryPreview;
