from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.user import (
    UserCreate,
    UserResponse,
    Token,
    GuestSessionCreate,
)
from app.services.auth_service import (
    register_user,
    login_user,
    create_guest_session,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/register", response_model=UserResponse)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    try:
        return register_user(db, user)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    try:
        return login_user(
            db,
            form_data.username,
            form_data.password,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e),
        )


@router.post("/guest", response_model=Token)
def guest_session(
    payload: GuestSessionCreate,
    db: Session = Depends(get_db),
):
    return create_guest_session(db, payload.device_id)


@router.get("/me", response_model=UserResponse)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user