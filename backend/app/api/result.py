from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.result import InterviewResultResponse
from app.services.result_service import get_interview_result


router = APIRouter(
    prefix="/interviews",
    tags=["Results"],
)


@router.get(
    "/{interview_id}/results",
    response_model=InterviewResultResponse,
)
def get_result(
    interview_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return get_interview_result(
            db,
            interview_id,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )