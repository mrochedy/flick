from uuid import UUID
from typing import List, Optional
from sqlalchemy.orm import Session

from src.repositories import NoteRepository
from src.schemas import NoteCreate, NoteUpdate, NoteInDB, NoteHistoryInDB


class NoteService:
    def __init__(self, db: Session):
        self.repository = NoteRepository(db)

    def get_all_notes(self) -> List[NoteInDB]:
        notes = self.repository.get_all()
        return [NoteInDB.model_validate(note) for note in notes]

    def get_note(self, note_id: UUID) -> Optional[NoteInDB]:
        note = self.repository.get_by_id(note_id)
        if note:
            return NoteInDB.model_validate(note)
        return None

    def create_note(self, note: NoteCreate) -> NoteInDB:
        created_note = self.repository.create(note)
        return NoteInDB.model_validate(created_note)

    def update_note(self, note_id: UUID, note: NoteUpdate) -> Optional[NoteInDB]:
        updated_note = self.repository.update(note_id, note)
        if updated_note:
            return NoteInDB.model_validate(updated_note)
        return None

    def delete_note(self, note_id: UUID) -> bool:
        return self.repository.delete(note_id)

    def get_note_history(self, note_id: UUID) -> List[NoteHistoryInDB]:
        history_entries = self.repository.get_note_history(note_id)
        return [NoteHistoryInDB.model_validate(entry) for entry in history_entries]
