import { QueryClient, QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { Note, RawNote, convertRawNote } from "models";
import { Sidebar, NoteEditor, Loader, ErrorDisplay } from "components";

import db from "db";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotesApp />
    </QueryClientProvider>
  );
}

function NotesApp() {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const {
    data: notes,
    isLoading,
    error,
  } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: () =>
      db
        .get("/notes/")
        .then((res) =>
          res.data
            .map((note: RawNote) => convertRawNote(note))
            .sort((a: Note, b: Note) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        ),
  });

  const invalidateNotes = () => {
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  };

  const updateNoteMutation = useMutation({
    mutationFn: (updatedNote: Note) => {
      return db.put(`/notes/${updatedNote.id}`, {
        title: updatedNote.title,
        content: updatedNote.content,
      });
    },
    onSuccess: invalidateNotes,
  });

  const createNoteMutation = useMutation({
    mutationFn: (data: { title: string; content: string }) => {
      return db.post("/notes/", {
        title: data.title,
        content: data.content,
      });
    },
    onSuccess: (data) => {
      invalidateNotes();
      setSelectedNoteId(data.data.id);
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => {
      return db.delete(`/notes/${id}`);
    },
    onSuccess: () => {
      invalidateNotes();
      setSelectedNoteId(null);
    },
  });

  const handleNoteSelect = (noteId: string) => {
    setSelectedNoteId(noteId);
  };

  const handleNoteSave = (noteToSave: Note) => {
    updateNoteMutation.mutate(noteToSave);
  };

  const handleNoteCreate = (title: string, content: string) => {
    createNoteMutation.mutate({ title, content });
  };

  const handleNoteDelete = (noteId: string) => {
    deleteNoteMutation.mutate(noteId);
  };

  const openNewNote = () => {
    setSelectedNoteId(null);
  };

  const selectedNote = notes?.find((note) => note.id === selectedNoteId) || null;

  return (
    <div className="app-container">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorDisplay message={error.message} />
      ) : (
        <>
          <Sidebar
            notes={notes || []}
            selectedNoteId={selectedNoteId}
            onNoteSelect={handleNoteSelect}
            onNewNote={openNewNote}
          />
          <NoteEditor
            note={selectedNote}
            onSave={handleNoteSave}
            onCreate={handleNoteCreate}
            onDelete={handleNoteDelete}
          />
        </>
      )}
    </div>
  );
}

export default App;
