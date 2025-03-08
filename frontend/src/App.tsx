import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

import db from "./db";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotesApp />
    </QueryClientProvider>
  );
}

function NotesApp() {
  interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface RawNote {
    id: number;
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
  }

  const {
    data: notes,
    isLoading,
    error,
  } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: () =>
      db.get("/notes/").then((res) =>
        res.data.map((note: RawNote) => ({
          ...note,
          createdAt: note.created_at,
          updatedAt: note.updated_at,
        }))
      ),
  });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div>
      <h1>Notes</h1>
      {notes?.map((note) => (
        <div key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <p>{note.createdAt.toLocaleString()}</p>
          <p>{note.updatedAt.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
