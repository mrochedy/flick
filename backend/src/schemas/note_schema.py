from datetime import datetime
from pydantic import BaseModel, Field, field_validator
from uuid import UUID
from typing import Optional


class NoteBase(BaseModel):
    title: str = Field(
        ..., min_length=1, max_length=100, description="Note title cannot be empty or contain more than 100 characters"
    )
    content: str

    @field_validator("title")
    @classmethod
    def title_must_not_be_empty(cls, v: str) -> str:
        v = v.strip() if v else v
        if not v:
            raise ValueError("Title cannot be empty or contain only spaces")
        return v


class NoteCreate(NoteBase):
    pass


class NoteUpdate(BaseModel):
    title: Optional[str] = Field(
        None, min_length=1, max_length=100, description="Note title cannot be empty or contain more than 100 characters"
    )
    content: Optional[str]

    @field_validator("title")
    @classmethod
    def title_must_not_be_empty_if_provided(cls, v: str) -> str:
        if v is not None:
            v = v.strip()
            if not v:
                raise ValueError("Title cannot be empty or contain only spaces")
        return v


class NoteInDB(NoteBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
