import { Note } from "models";

import "./NoteEditor.css";

interface Props {
  note: Note | null;
}

const NoteEditor = ({ note }: Props) => {
  if (!note) {
    return <div>Please select a note to edit</div>;
  }

  return <div>{note.title}</div>;
};

export default NoteEditor;
