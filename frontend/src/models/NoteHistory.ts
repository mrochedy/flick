export interface NoteHistory {
  id: string;
  noteId: string;
  title: string;
  content: string;
  versionDate: Date;
}
  
export interface RawNoteHistory {
  id: string;
  note_id: string;
  title: string;
  content: string;
  version_date: Date;
}

export const convertRawNoteHistory = (rawHistory: RawNoteHistory): NoteHistory => {
  return {
    id: rawHistory.id,
    noteId: rawHistory.note_id,
    title: rawHistory.title,
    content: rawHistory.content,
    versionDate: rawHistory.version_date,
  };
};