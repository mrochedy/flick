import uuid

from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from src.core import Base


class Note(Base):
    __tablename__ = "notes"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    title = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    history = relationship("NoteHistory", back_populates="note", cascade="all, delete-orphan")


class NoteHistory(Base):
    __tablename__ = "note_history"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    note_id = Column(UUID(as_uuid=True), ForeignKey("notes.id"), nullable=False)
    title = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    version_date = Column(DateTime, default=datetime.now, nullable=False)

    note = relationship("Note", back_populates="history")
