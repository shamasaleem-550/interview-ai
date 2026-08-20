from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class GeneratedQuestionResponse(BaseModel):
    id: UUID
    interview_id: UUID
    question_text: str
    question_type: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }


class InterviewWithQuestionsResponse(BaseModel):
    id: UUID
    title: str
    job_role: str
    difficulty: str
    user_id: UUID
    created_at: datetime
    questions: list[GeneratedQuestionResponse]