from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class QuestionCreate(BaseModel):
    question_text: str = Field(
        ...,
        min_length=5,
        max_length=500,
    )

    question_type: str = Field(
        ...,
        min_length=2,
        max_length=50,
    )


class QuestionResponse(BaseModel):
    id: UUID
    interview_id: UUID
    question_text: str
    question_type: str
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )