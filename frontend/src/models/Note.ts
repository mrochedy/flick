export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RawNote {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export const convertRawNote = (rawNote: RawNote): Note => {
  return {
    id: rawNote.id,
    title: rawNote.title,
    content: rawNote.content,
    createdAt: rawNote.created_at,
    updatedAt: rawNote.updated_at
  };
}; 