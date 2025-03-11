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

  const updateNoteMutation = useMutation({
    mutationFn: (updatedNote: Note) => {
      return db.put(`/notes/${updatedNote.id}`, {
        title: updatedNote.title,
        content: updatedNote.content,
      });
    },
    onSuccess: () => {
      // Invalider la requête pour forcer un rafraîchissement des données
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleNoteSelect = (noteId: number) => {
    setSelectedNoteId(noteId);
  };

  const handleNoteSave = (updatedNote: Note) => {
    updateNoteMutation.mutate(updatedNote);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const selectedNote = notes?.find((note) => note.id === selectedNoteId) || null;

  return (
    <div className="app-container">
      <Sidebar notes={notes || []} selectedNoteId={selectedNoteId} onNoteSelect={handleNoteSelect} />
      <NoteEditor note={selectedNote} onSave={handleNoteSave} />
    </div>
  );
}

export default App;
