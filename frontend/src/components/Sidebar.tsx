import { Note } from "models";
import MinimizedNotesList from "./minimized_notes/MinimizedNotesList";
import "./Sidebar.css";

interface Props {
  notes: Note[];
  selectedNoteId: number | null;
  onNoteSelect: (noteId: number) => void;
}

function Sidebar({ notes, selectedNoteId, onNoteSelect }: Props) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">Flick</div>
      </div>
      <div className="sidebar-content">
        <MinimizedNotesList notes={notes} selectedNoteId={selectedNoteId} onNoteSelect={onNoteSelect} />
      </div>
    </div>
  );
}

export default Sidebar;
