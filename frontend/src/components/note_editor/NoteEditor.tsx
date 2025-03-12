import { Note } from "models";

import NoteEditorBody from "./NoteEditorBody";
import NoteEditorToolbar from "./NoteEditorToolbar";

import "./NoteEditor.css";

interface Props {
  note: Note | null;
  onSave: (note: Note) => void;
  onCreate: (title: string, content: string) => void;
  onDelete: (noteId: string) => void;
}

function NoteEditor({ note, onSave, onCreate, onDelete }: Props) {
  return (
    <div className="note-editor">
      <NoteEditorToolbar note={note} onDelete={onDelete} />
      <NoteEditorBody note={note} onSave={onSave} onCreate={onCreate} />
    </div>
  );
}

export default NoteEditor;
