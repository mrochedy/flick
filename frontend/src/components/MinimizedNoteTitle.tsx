import "./MinimizedNoteTitle.css";

interface Props {
  title: string;
}

function MinimizedNoteTitle({ title }: Props) {
  return <div className="minimized-note-title">{title}</div>;
}

export default MinimizedNoteTitle;
