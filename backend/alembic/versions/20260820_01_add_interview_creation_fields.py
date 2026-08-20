"""add fields needed for real interview creation

Revision ID: 20260820_01
Revises: 81772644152e
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "20260820_01"
down_revision: Union[str, Sequence[str], None] = "81772644152e"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("interviews", sa.Column("company", sa.String(length=255), nullable=True))
    op.add_column("interviews", sa.Column("interview_type", sa.String(length=50), nullable=False, server_default="Technical"))
    op.add_column("interviews", sa.Column("question_count", sa.Integer(), nullable=False, server_default="10"))
    op.add_column("interviews", sa.Column("job_description", sa.Text(), nullable=True))
    op.alter_column("interviews", "interview_type", server_default=None)
    op.alter_column("interviews", "question_count", server_default=None)


def downgrade() -> None:
    op.drop_column("interviews", "job_description")
    op.drop_column("interviews", "question_count")
    op.drop_column("interviews", "interview_type")
    op.drop_column("interviews", "company")
