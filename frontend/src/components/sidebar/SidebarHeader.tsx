import { GrAddCircle as AddIcon } from "react-icons/gr";

import "./SidebarHeader.css";

interface Props {
  onNewNote: () => void;
}

function SidebarHeader({ onNewNote }: Props) {
  return (
    <div className="sidebar-header">
      <div className="sidebar-header-content">
        <div className="logo">Flick</div>
        <div className="new-note-button">
          <button title="Create new note" onClick={onNewNote}>
            <AddIcon size="1.9rem" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SidebarHeader;
