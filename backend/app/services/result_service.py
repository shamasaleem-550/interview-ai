from uuid import UUID

from sqlalchemy.orm import Session

from app.models.answer import Answer
from app.models.interview import Interview
from app.models.question import Question
from app.models.user import User


def get_interview_result(
    db: Session,
    interview_id: UUID,
    current_user: User,
):
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

    # Get all questions for this interview
    questions = (
        db.query(Question)
        .filter(Question.interview_id == interview_id)
        .order_by(Question.created_at)
        .all()
    )

    results = []
    total_score = 0
    answered_count = 0

    for question in questions:
        answer = (
            db.query(Answer)
            .filter(Answer.question_id == question.id)
            .order_by(Answer.created_at.desc())
            .first()
        )

        score = None
        answer_text = None
        feedback = None

        if answer is not None:
            answer_text = answer.answer_text
            score = answer.score
            feedback = answer.feedback

            if score is not None:
                total_score += score
                answered_count += 1

        results.append(
            {
                "question_id": question.id,
                "question_text": question.question_text,
                "answer_text": answer_text,
                "score": score,
                "feedback": feedback,
            }
        )

    max_score = len(questions) * 10

    return {
        "interview_id": interview.id,
        "title": interview.title,
        "job_role": interview.job_role,
        "difficulty": interview.difficulty,
        "total_score": total_score,
        "max_score": max_score,
        "questions": results,
    }