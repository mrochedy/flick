import { Note } from "models";
import MinimizedNotesList from "./MinimizedNotesList";
import "./Sidebar.css";

interface SidebarProps {
  notes: Note[];
}

function Sidebar({ notes }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">Flick</div>
      </div>
      <div className="sidebar-content">
        <MinimizedNotesList notes={notes} />
      </div>
    </div>
  );
}

export default Sidebar;
