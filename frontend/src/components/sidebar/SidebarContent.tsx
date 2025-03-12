import { Note } from "models";

import MinimizedNotesList from "../minimized_notes/MinimizedNotesList";

import "./SidebarContent.css";

interface Props {
  notes: Note[];
  selectedNoteId: string | null;
  onNoteSelect: (noteId: string) => void;
}

function SidebarContent({ notes, selectedNoteId, onNoteSelect }: Props) {
  return (
    <div className="sidebar-content">
      <MinimizedNotesList notes={notes} selectedNoteId={selectedNoteId} onNoteSelect={onNoteSelect} />
    </div>
  );
}

export default SidebarContent;
