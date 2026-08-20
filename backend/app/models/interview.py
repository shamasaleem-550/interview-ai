import uuid

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class Interview(Base):
    __tablename__ = "interviews"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    job_role = Column(String(100), nullable=False)
    difficulty = Column(String(50), nullable=False)
    company = Column(String(255), nullable=True)
    interview_type = Column(String(50), nullable=False, default="Technical")
    question_count = Column(Integer, nullable=False, default=10)
    job_description = Column(Text, nullable=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    questions = relationship(
        "Question",
        back_populates="interview",
        cascade="all, delete-orphan",
    )
