"""add static map url to 'Activity' table

Revision ID: 5a42db64e872
Revises: 92adde6ac0d0
Create Date: 2018-05-30 10:52:33.433687

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5a42db64e872'
down_revision = '92adde6ac0d0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('activities', sa.Column('map', sa.String(length=255), nullable=True))
    op.create_unique_constraint(None, 'sports', ['img'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'sports', type_='unique')
    op.drop_column('activities', 'map')
    # ### end Alembic commands ###
