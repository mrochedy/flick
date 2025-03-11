import { useState, useEffect, useCallback } from "react";

import { Note } from "models";

import "./NoteEditor.css";

interface Props {
  note: Note | null;
  onSave: (updatedNote: Note) => void;
  onCreate: (title: string, content: string) => void;
}

const NoteEditor = ({ note, onSave, onCreate }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previousNote, setPreviousNote] = useState<Note | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const defaultTitle = "New note";
  const defaultContent = "Start writing...";

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
    } else {
      const titleChanged = title !== "";
      const contentChanged = content !== "";
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
    } else if (hasChanges) {
      onCreate(title || defaultTitle, content || defaultContent);
    }
  }, [note, onSave, onCreate, title, content, hasChanges]);

  useEffect(() => {
    if (!hasChanges) return;

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
        placeholder={defaultTitle}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-editor-content"
        placeholder={defaultContent}
      />
    </div>
  );
};

export default NoteEditor;
