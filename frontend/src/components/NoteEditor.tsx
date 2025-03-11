import { useState, useEffect } from "react";

import { Note } from "models";

import "./NoteEditor.css";

interface Props {
  note: Note | null;
}

const NoteEditor = ({ note }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
    }
  }, [note]);

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
