from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.interview import (
    InterviewCreate,
    InterviewResponse,
)
from app.schemas.interview_result import (
    InterviewWithQuestionsResponse,
)
from app.services.interview_service import (
    create_interview,
    get_interview_by_id,
    get_user_interviews,
)


router = APIRouter(
    prefix="/interviews",
    tags=["Interviews"],
)


@router.post(
    "/",
    response_model=InterviewWithQuestionsResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_interview(
    interview: InterviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return create_interview(
            db,
            interview,
            current_user,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Unable to create the AI interview: {str(e)}",
        )


@router.get(
    "/",
    response_model=list[InterviewResponse],
)
def list_interviews(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_user_interviews(
        db,
        current_user,
    )


@router.get(
    "/{interview_id}",
    response_model=InterviewResponse,
)
def get_interview(
    interview_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    interview = get_interview_by_id(
        db,
        interview_id,
        current_user,
    )

    if interview is None:
        raise HTTPException(
            status_code=404,
            detail="Interview not found.",
        )

    return interview