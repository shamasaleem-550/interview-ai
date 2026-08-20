"""
Import all SQLAlchemy models here.

Alembic imports this file so it can discover every model
and generate database migrations automatically.
"""

from app.database.database import Base

from app.models.user import User
from app.models.interview import Interview
from app.models.question import Question
from app.models.answer import Answer


__all__ = [
    "Base",
    "User",
    "Interview",
    "Question",
    "Answer",
]