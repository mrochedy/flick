from fastapi import APIRouter, Depends, HTTPException
from uuid import UUID
from typing import List
from sqlalchemy.orm import Session

from src.core import get_db
from src.services import NoteService
from src.schemas import NoteCreate, NoteUpdate, NoteInDB, NoteHistoryInDB

router = APIRouter(prefix="/notes", tags=["notes"])


@router.get("/", response_model=List[NoteInDB])
def get_notes(db: Session = Depends(get_db)):
    service = NoteService(db)
    return service.get_all_notes()


@router.get("/{note_id}", response_model=NoteInDB)
def get_note(note_id: UUID, db: Session = Depends(get_db)):
    service = NoteService(db)
    note = service.get_note(note_id)
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return note


@router.get("/{note_id}/history", response_model=List[NoteHistoryInDB])
def get_note_history(note_id: UUID, db: Session = Depends(get_db)):
    service = NoteService(db)
    note = service.get_note(note_id)
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return service.get_note_history(note_id)


@router.post("/", response_model=NoteInDB)
def create_note(note: NoteCreate, db: Session = Depends(get_db)):
    service = NoteService(db)
    return service.create_note(note)


@router.put("/{note_id}", response_model=NoteInDB)
def update_note(note_id: UUID, note: NoteUpdate, db: Session = Depends(get_db)):
    service = NoteService(db)
    updated_note = service.update_note(note_id, note)
    if updated_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return updated_note


@router.delete("/{note_id}")
def delete_note(note_id: UUID, db: Session = Depends(get_db)):
    service = NoteService(db)
    if not service.delete_note(note_id):
        raise HTTPException(status_code=404, detail="Note not found")
    return {"message": "Note deleted successfully"}
