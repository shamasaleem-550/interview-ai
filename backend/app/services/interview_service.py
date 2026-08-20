from uuid import UUID

from sqlalchemy.orm import Session

from app.models.interview import Interview
from app.models.question import Question
from app.models.user import User
from app.schemas.interview import InterviewCreate
from app.services.ai_service import generate_interview_questions


def create_interview(
    db: Session,
    interview: InterviewCreate,
    current_user: User,
) -> Interview:
    new_interview = Interview(
        title=interview.title.strip(),
        job_role=interview.job_role.strip(),
        difficulty=interview.difficulty.strip(),
        company=interview.company.strip() if interview.company else None,
        interview_type=interview.interview_type.strip(),
        question_count=interview.question_count,
        job_description=interview.job_description.strip() if interview.job_description else None,
        user_id=current_user.id,
    )

    db.add(new_interview)
    db.commit()
    db.refresh(new_interview)

    try:
        generated_questions = generate_interview_questions(
            job_role=new_interview.job_role,
            difficulty=new_interview.difficulty,
            number_of_questions=new_interview.question_count,
            interview_type=new_interview.interview_type,
            company=new_interview.company,
            job_description=new_interview.job_description,
        )

        for question_text in generated_questions:
            db.add(
                Question(
                    interview_id=new_interview.id,
                    question_text=question_text,
                    question_type=new_interview.interview_type.lower(),
                )
            )

        db.commit()
        db.refresh(new_interview)
        return new_interview

    except Exception:
        db.rollback()
        db.delete(new_interview)
        db.commit()
        raise


def get_user_interviews(db: Session, current_user: User):
    return (
        db.query(Interview)
        .filter(Interview.user_id == current_user.id)
        .order_by(Interview.created_at.desc())
        .all()
    )


def get_interview_by_id(db: Session, interview_id: UUID, current_user: User):
    return (
        db.query(Interview)
        .filter(
            Interview.id == interview_id,
            Interview.user_id == current_user.id,
        )
        .first()
    )
