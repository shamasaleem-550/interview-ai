from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.models.user import User
from app.schemas.user import UserCreate


def register_user(db: Session, user: UserCreate) -> User:
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise ValueError("Email already registered.")

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password_hash=hash_password(user.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def login_user(
    db: Session,
    username: str,
    password: str,
):
    db_user = (
        db.query(User)
        .filter(User.email == username)
        .first()
    )

    if db_user is None:
        raise ValueError("Invalid email or password.")

    if not verify_password(
        password,
        db_user.password_hash,
    ):
        raise ValueError("Invalid email or password.")

    token = create_access_token(
        {
            "sub": str(db_user.id),
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }

def create_guest_session(db: Session, device_id: str):
    """Create or reuse a local guest candidate session for the current browser."""
    import hashlib

    digest = hashlib.sha256(device_id.encode("utf-8")).hexdigest()[:24]
    email = f"guest-{digest}@local.interviewai"

    user = db.query(User).filter(User.email == email).first()
    if user is None:
        user = User(
            full_name="Guest Candidate",
            email=email,
            password_hash=hash_password(digest),
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    token = create_access_token({"sub": str(user.id)})
    return {
        "access_token": token,
        "token_type": "bearer",
    }
