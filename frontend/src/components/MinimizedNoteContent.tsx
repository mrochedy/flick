import "./MinimizedNoteContent.css";

interface Props {
  content: string;
}

function MinimizedNoteContent({ content }: Props) {
  return <div className="minimized-note-content">{content}</div>;
}

export default MinimizedNoteContent;
