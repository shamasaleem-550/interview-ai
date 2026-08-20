from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.answer import AnswerCreate, AnswerResponse
from app.services.answer_service import create_answer


router = APIRouter(
    prefix="/interviews",
    tags=["Answers"],
)


@router.post(
    "/{interview_id}/questions/{question_id}/answers",
    response_model=AnswerResponse,
    status_code=status.HTTP_201_CREATED,
)
def submit_answer(
    interview_id: UUID,
    question_id: UUID,
    answer: AnswerCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return create_answer(
            db=db,
            interview_id=interview_id,
            question_id=question_id,
            answer_text=answer.answer_text,
            current_user=current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )