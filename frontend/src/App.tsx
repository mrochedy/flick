import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Note, RawNote, convertRawNote } from "models";
import db from "./db";
import MinimizedNotesList from "./components/MinimizedNotesList";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotesApp />
    </QueryClientProvider>
  );
}

function NotesApp() {
  const {
    data: notes,
    isLoading,
    error,
  } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: () => db.get("/notes/").then((res) => res.data.map((note: RawNote) => convertRawNote(note))),
  });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div>
      <MinimizedNotesList notes={notes || []} />
    </div>
  );
}

export default App;
