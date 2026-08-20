from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User

from app.schemas.question import (
    QuestionCreate,
    QuestionResponse,
)

from app.services.question_service import (
    create_question,
    get_interview_questions,
)


router = APIRouter(
    prefix="/interviews",
    tags=["Questions"],
)


@router.post(
    "/{interview_id}/questions",
    response_model=QuestionResponse,
)
def add_question(
    interview_id: UUID,
    question: QuestionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return create_question(
            db,
            interview_id,
            question,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.get(
    "/{interview_id}/questions",
    response_model=list[QuestionResponse],
)
def list_questions(
    interview_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return get_interview_questions(
            db,
            interview_id,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )