"""create questions table

Revision ID: 07533ac51d7e
Revises: 0e289e55f985
Create Date: 2026-08-07 16:04:11.757930

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision: str = "07533ac51d7e"
down_revision: Union[str, Sequence[str], None] = "0e289e55f985"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "questions",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            nullable=False,
        ),
        sa.Column(
            "interview_id",
            postgresql.UUID(as_uuid=True),
            nullable=False,
        ),
        sa.Column(
            "question_text",
            sa.String(length=500),
            nullable=False,
        ),
        sa.Column(
            "question_type",
            sa.String(length=50),
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["interview_id"],
            ["interviews.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade() -> None:
    op.drop_table("questions")