import MinimizedNoteTitle from "./MinimizedNoteTitle";
import MinimizedNoteContent from "./MinimizedNoteContent";

interface Props {
  title: string;
  content: string;
}

function MinimizedNote({ title, content }: Props) {
  return (
    <div className="minimized-note">
      <MinimizedNoteTitle title={title} />
      <MinimizedNoteContent content={content} />
    </div>
  );
}

export default MinimizedNote;
