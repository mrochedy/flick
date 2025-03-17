import { Note } from "models";

import { NoteEditorBody, NoteEditorToolbar } from "components";

import "./NoteEditor.css";

interface Props {
  note: Note | null;
  onSave: (note: Note) => void;
  onCreate: (title: string, content: string) => void;
  onDelete: (noteId: string) => void;
}

function NoteEditor({ note, onSave, onCreate, onDelete }: Props) {
  const handleRestoreVersion = (title: string, content: string) => {
    if (note) {
      const updatedNote: Note = {
        ...note,
        title,
        content,
      };
      onSave(updatedNote);
    }
  };

  return (
    <div className="note-editor">
      <NoteEditorToolbar note={note} onDelete={onDelete} onRestoreVersion={handleRestoreVersion} />
      <NoteEditorBody note={note} onSave={onSave} onCreate={onCreate} />
    </div>
  );
}

export default NoteEditor;
