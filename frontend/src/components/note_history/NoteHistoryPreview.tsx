import { NoteHistory } from "models";
import { computeDiff, DiffLine } from "utils";

import "./NoteHistoryPreview.css";

interface Props {
  history: NoteHistory[];
  selectedVersionId: string;
}

function NoteHistoryPreview({ history, selectedVersionId }: Props) {
  const selectedVersion = history.find((v) => v.id === selectedVersionId);
  const selectedVersionIndex = history.findIndex((v) => v.id === selectedVersionId);
  const previousVersion = selectedVersionIndex < history.length - 1 ? history[selectedVersionIndex + 1] : null;

  const diffLines = selectedVersion ? computeDiff(selectedVersion.content, previousVersion?.content || "") : [];

  return (
    <div className="note-history-preview">
      <div className="note-history-preview-title">{selectedVersion?.title}</div>
      <div className="note-history-preview-content">
        {diffLines.map((line: DiffLine, index: number) => (
          <div key={index} className={`diff-line ${line.type}`}>
            {line.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteHistoryPreview;
