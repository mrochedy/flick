import { useState, useEffect } from "react";

import { Note } from "models";

import "./NoteEditor.css";

interface Props {
  note: Note | null;
  onSave: (updatedNote: Note) => void;
}

const NoteEditor = ({ note, onSave }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previousNote, setPreviousNote] = useState<Note | null>(null);

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note]);

  useEffect(() => {
    if (note?.id !== previousNote?.id) {
      if (previousNote && previousNote.id !== null) {
        onSave({
          ...previousNote,
          title,
          content,
        });
      }
    }

    setPreviousNote(note);
  }, [note, previousNote, onSave, title, content]);

  return (
    <div className="note-editor">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="note-editor-title"
        placeholder="New note"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-editor-content"
        placeholder="Start writing..."
      />
    </div>
  );
};

export default NoteEditor;
