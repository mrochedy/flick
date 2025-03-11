import { useState, useEffect, useCallback } from "react";

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
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setHasChanges(false);
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
      setPreviousNote(note);
    }
  }, [note, previousNote, onSave, title, content]);

  useEffect(() => {
    if (note) {
      const titleChanged = title !== note.title;
      const contentChanged = content !== note.content;
      setHasChanges(titleChanged || contentChanged);
    }
  }, [title, content, note]);

  const handleSave = useCallback(() => {
    if (note && hasChanges) {
      onSave({
        ...note,
        title,
        content,
      });
      setHasChanges(false);
    }
  }, [note, onSave, title, content, hasChanges]);

  useEffect(() => {
    if (!note || !hasChanges) return;

    const saveTimer = setTimeout(() => {
      handleSave();
    }, 1000);

    return () => clearTimeout(saveTimer);
  }, [title, content, note, handleSave, hasChanges]);

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
