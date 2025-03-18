import { useState, useEffect, useRef, useCallback } from "react";

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

  const noteRef = useRef(note);
  const previousNoteRef = useRef(previousNote);
  const titleRef = useRef(title);
  const contentRef = useRef(content);
  const hasChangesRef = useRef(hasChanges);
  const onSaveRef = useRef(onSave);

  useEffect(() => {
    noteRef.current = note;
    previousNoteRef.current = previousNote;
    titleRef.current = title;
    contentRef.current = content;
    hasChangesRef.current = hasChanges;
    onSaveRef.current = onSave;
  }, [note, previousNote, title, content, hasChanges, onSave]);

  useEffect(() => {
    updateNoteTitleAndContentWhenNoteChanges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note]);

  const updateNoteTitleAndContentWhenNoteChanges = useCallback(() => {
    setTitle(noteRef.current?.title || "");
    setContent(noteRef.current?.content || "");
    setHasChanges(false);
  }, []);

  useEffect(() => {
    saveCurrentNoteWhenNoteChanges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note]);

  const saveCurrentNoteWhenNoteChanges = useCallback(() => {
    if (noteRef.current?.id !== previousNoteRef.current?.id) {
      if (hasChangesRef.current && previousNoteRef.current && previousNoteRef.current.id !== null) {
        onSaveRef.current({
          ...previousNoteRef.current,
          title: titleRef.current,
          content: contentRef.current,
        });
      }
      setPreviousNote(noteRef.current);
    }
  }, []);

  useEffect(() => {
    detectChangesInNoteTitleOrContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content]);

  const detectChangesInNoteTitleOrContent = useCallback(() => {
    if (noteRef.current && !hasChangesRef.current) {
      const titleChanged = titleRef.current !== noteRef.current.title;
      const contentChanged = contentRef.current !== noteRef.current.content;
      setHasChanges(titleChanged || contentChanged);
    }
  }, []);

  useEffect(() => {
    return handleAutoSaveAfterTimeout(1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content]);

  const handleAutoSaveAfterTimeout = useCallback((timeoutInMs: number) => {
    if (!noteRef.current) return;

    const saveTimer = setTimeout(() => {
      if (noteRef.current && hasChangesRef.current) {
        onSaveRef.current({
          ...noteRef.current,
          title: titleRef.current,
          content: contentRef.current,
        });
        setHasChanges(false);
      }
    }, timeoutInMs);

    return () => clearTimeout(saveTimer);
  }, []);

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
