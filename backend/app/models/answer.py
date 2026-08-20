import uuid

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.database.database import Base


class Answer(Base):
    __tablename__ = "answers"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    question_id = Column(
        UUID(as_uuid=True),
        ForeignKey("questions.id"),
        nullable=False,
    )

    answer_text = Column(
        Text,
        nullable=False,
    )

    score = Column(
        Integer,
        nullable=True,
    )

    feedback = Column(
        Text,
        nullable=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )