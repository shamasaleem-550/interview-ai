from uuid import UUID

from sqlalchemy.orm import Session

from app.models.question import Question
from app.models.interview import Interview
from app.models.user import User
from app.schemas.question import QuestionCreate


def create_question(
    db: Session,
    interview_id: UUID,
    question: QuestionCreate,
    current_user: User,
):
    interview = (
        db.query(Interview)
        .filter(
            Interview.id == interview_id,
            Interview.user_id == current_user.id,
        )
        .first()
    )

    if interview is None:
        raise ValueError("Interview not found.")

    new_question = Question(
        interview_id=interview_id,
        question_text=question.question_text,
        question_type=question.question_type,
    )

    db.add(new_question)
    db.commit()
    db.refresh(new_question)

    return new_question


def get_interview_questions(
    db: Session,
    interview_id: UUID,
    current_user: User,
):
    interview = (
        db.query(Interview)
        .filter(
            Interview.id == interview_id,
            Interview.user_id == current_user.id,
        )
        .first()
    )

    if interview is None:
        raise ValueError("Interview not found.")

    return (
        db.query(Question)
        .filter(
            Question.interview_id == interview_id
        )
        .order_by(Question.created_at)
        .all()
    )