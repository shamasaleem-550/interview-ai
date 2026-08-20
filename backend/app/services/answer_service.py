import json
import re
from uuid import UUID

from sqlalchemy.orm import Session

from app.models.answer import Answer
from app.models.question import Question
from app.models.interview import Interview
from app.models.user import User
from app.services.ai_service import evaluate_answer


def create_answer(
    db: Session,
    interview_id: UUID,
    question_id: UUID,
    answer_text: str,
    current_user: User,
) -> Answer:

    # Make sure the interview belongs to the logged-in user
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

    # Make sure the question belongs to this interview
    question = (
        db.query(Question)
        .filter(
            Question.id == question_id,
            Question.interview_id == interview_id,
        )
        .first()
    )

    if question is None:
        raise ValueError("Question not found.")

    # Ask Gemini to evaluate the answer
    evaluation = evaluate_answer(
        question.question_text,
        answer_text,
    )

    # Extract score and feedback
    score = evaluation.get("score")
    feedback = evaluation.get("feedback")

    new_answer = Answer(
        question_id=question_id,
        answer_text=answer_text,
        score=score,
        feedback=feedback,
    )

    db.add(new_answer)
    db.commit()
    db.refresh(new_answer)

    return new_answer


def get_question_answers(
    db: Session,
    interview_id: UUID,
    question_id: UUID,
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

    question = (
        db.query(Question)
        .filter(
            Question.id == question_id,
            Question.interview_id == interview_id,
        )
        .first()
    )

    if question is None:
        raise ValueError("Question not found.")

    return (
        db.query(Answer)
        .filter(
            Answer.question_id == question_id
        )
        .order_by(Answer.created_at.desc())
        .all()
    )
    