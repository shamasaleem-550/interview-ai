from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class InterviewCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    job_role: str = Field(..., min_length=2, max_length=100)
    difficulty: str = Field(..., min_length=2, max_length=50)
    company: str | None = Field(default=None, max_length=255)
    interview_type: str = Field(default="Technical", min_length=2, max_length=50)
    question_count: int = Field(default=10, ge=1, le=15)
    job_description: str | None = Field(default=None, max_length=12000)


class InterviewResponse(BaseModel):
    id: UUID
    title: str
    job_role: str
    difficulty: str
    company: str | None
    interview_type: str
    question_count: int
    job_description: str | None
    user_id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
