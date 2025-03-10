import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Note, RawNote, convertRawNote } from "models";
import db from "./db";
import Sidebar from "./components/Sidebar";
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
  const {
    data: notes,
    isLoading,
    error,
  } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: () => db.get("/notes/").then((res) => res.data.map((note: RawNote) => convertRawNote(note))),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="app-container">
      <Sidebar notes={notes || []} />
      <div className="main-content">
        <div className="content">Select a note to display</div>
      </div>
    </div>
  );
}

export default App;
