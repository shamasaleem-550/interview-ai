import uuid

from sqlalchemy import Column, DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class Question(Base):
    __tablename__ = "questions"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    interview_id = Column(
        UUID(as_uuid=True),
        ForeignKey("interviews.id"),
        nullable=False,
    )

    question_text = Column(
        String(500),
        nullable=False,
    )

    question_type = Column(
        String(50),
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    interview = relationship(
        "Interview",
        back_populates="questions",
    )