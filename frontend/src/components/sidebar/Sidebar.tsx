import { Note } from "models";

import SidebarContent from "./SidebarContent";
import SidebarHeader from "./SidebarHeader";

import "./Sidebar.css";

interface Props {
  notes: Note[];
  selectedNoteId: string | null;
  onNoteSelect: (noteId: string) => void;
  onNewNote: () => void;
}

function Sidebar({ notes, selectedNoteId, onNoteSelect, onNewNote }: Props) {
  return (
    <div className="sidebar">
      <SidebarHeader onNewNote={onNewNote} />
      <SidebarContent notes={notes} selectedNoteId={selectedNoteId} onNoteSelect={onNoteSelect} />
    </div>
  );
}

export default Sidebar;
