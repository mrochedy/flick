import MinimizedNoteTitle from "./MinimizedNoteTitle";
import MinimizedNoteContent from "./MinimizedNoteContent";

interface Props {
  title: string;
  content: string;
}

function MinimizedNote({ title, content }: Props) {
  return (
    <>
      <MinimizedNoteTitle title={title} />
      <MinimizedNoteContent content={content} />
    </>
  );
}

export default MinimizedNote;
