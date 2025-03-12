import { Note } from "models";

import MinimizedNotesList from "../minimized_notes/MinimizedNotesList";

import "./SidebarContent.css";

interface Props {
  notes: Note[];
  selectedNoteId: number | null;
  onNoteSelect: (noteId: number) => void;
}

function SidebarContent({ notes, selectedNoteId, onNoteSelect }: Props) {
  return (
    <div className="sidebar-content">
      <MinimizedNotesList notes={notes} selectedNoteId={selectedNoteId} onNoteSelect={onNoteSelect} />
    </div>
  );
}

export default SidebarContent;
