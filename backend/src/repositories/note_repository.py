from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional

from src.models import Note
from src.schemas import NoteCreate, NoteUpdate


class NoteRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> List[Note]:
        return self.db.query(Note).all()

    def get_by_id(self, note_id: UUID) -> Optional[Note]:
        return self.db.query(Note).filter(Note.id == note_id).first()

    def create(self, note: NoteCreate) -> Note:
        db_note = Note(**note.model_dump())
        self.db.add(db_note)
        self.db.commit()
        self.db.refresh(db_note)
        return db_note

    def update(self, note_id: UUID, note: NoteUpdate) -> Optional[Note]:
        db_note = self.get_by_id(note_id)
        if db_note:
            update_data = note.model_dump(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_note, key, value)
            self.db.commit()
            self.db.refresh(db_note)
        return db_note

    def delete(self, note_id: UUID) -> bool:
        db_note = self.get_by_id(note_id)
        if db_note:
            self.db.delete(db_note)
            self.db.commit()
            return True
        return False
