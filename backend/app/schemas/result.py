from uuid import UUID

from pydantic import BaseModel


class InterviewQuestionResult(BaseModel):
    question_id: UUID
    question_text: str
    answer_text: str | None
    score: int | None
    feedback: str | None


class InterviewResultResponse(BaseModel):
    interview_id: UUID
    title: str
    job_role: str
    difficulty: str
    total_score: int
    max_score: int
    questions: list[InterviewQuestionResult]