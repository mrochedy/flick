import { useState, useEffect, useCallback } from "react";

import { Note } from "models";

import "./NoteEditorBody.css";

interface Props {
  note: Note | null;
  onSave: (updatedNote: Note) => void;
  onCreate: (title: string, content: string) => void;
}

const NoteEditorBody = ({ note, onSave, onCreate }: Props) => {
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
      if (hasChanges && previousNote && previousNote.id !== null) {
        onSave({
          ...previousNote,
          title,
          content,
        });
      }
      setPreviousNote(note);
    }
  }, [note, previousNote, onSave, title, content, hasChanges]);

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
    if (!hasChanges) return;

    const saveTimer = setTimeout(() => {
      handleSave();
    }, 1000);

    return () => clearTimeout(saveTimer);
  }, [title, content, note, handleSave, hasChanges]);

  return (
    <div className="note-editor-body">
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (!note) onCreate(e.target.value, defaultContent);
        }}
        className="note-editor-title"
        placeholder={defaultTitle}
      />
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          if (!note) onCreate(defaultTitle, e.target.value);
        }}
        className="note-editor-content"
        placeholder={defaultContent}
      />
    </div>
  );
};

export default NoteEditorBody;
