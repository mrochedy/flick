import { QueryClient, QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { Note, RawNote, convertRawNote } from "models";

import db from "./db";
import Sidebar from "./components/Sidebar";
import NoteEditor from "./components/NoteEditor";

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
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  const {
    data: notes,
    isLoading,
    error,
  } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: () => db.get("/notes/").then((res) => res.data.map((note: RawNote) => convertRawNote(note))),
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

  const handleNoteSelect = (noteId: number) => {
    setSelectedNoteId(noteId);
  };

  const handleNoteSave = (noteToSave: Note) => {
    updateNoteMutation.mutate(noteToSave);
  };

  const handleNoteCreate = (title: string, content: string) => {
    createNoteMutation.mutate({ title, content });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const selectedNote = notes?.find((note) => note.id === selectedNoteId) || null;

  return (
    <div className="app-container">
      <Sidebar notes={notes || []} selectedNoteId={selectedNoteId} onNoteSelect={handleNoteSelect} />
      <NoteEditor note={selectedNote} onSave={handleNoteSave} onCreate={handleNoteCreate} />
    </div>
  );
}

export default App;
