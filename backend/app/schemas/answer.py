from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class AnswerCreate(BaseModel):
    answer_text: str = Field(
        ...,
        min_length=1,
        max_length=5000,
    )


class AnswerResponse(BaseModel):
    id: UUID
    question_id: UUID
    answer_text: str
    score: int | None
    feedback: str | None
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )