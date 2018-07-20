from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.types import VARCHAR, TypeDecorator


db = SQLAlchemy()


class StringEncodedList(TypeDecorator):

    impl = VARCHAR

    def process_bind_param(self, value, dialect):
        if isinstance(value, str):
            return value

        return ','.join(value)

    def process_result_value(self, value, dialect):
        if value == '':
            return []
        else:
            return value.split(',')


class Email(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)


class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

    profile_image_url = db.Column(db.String(255))

    clinical_specialties = db.Column(StringEncodedList(1024))
    affiliations = db.Column(StringEncodedList(1024))
    additional_interests = db.Column(StringEncodedList(1024))

    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    date_updated = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    additional_information = db.Column(db.String(500), nullable=False)

    willing_shadowing = db.Column(db.Boolean, default=False)
    willing_networking = db.Column(db.Boolean, default=False)
    willing_goal_setting = db.Column(db.Boolean, default=False)
    willing_discuss_personal = db.Column(db.Boolean, default=False)
    willing_residency_application = db.Column(db.Boolean, default=False)

    cadence = db.Column(db.String(255))
    other_cadence = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f'<Profile id={self.id} name={self.name}>'


class VerificationToken(db.Model):
    token = db.Column(db.String(36), primary_key=True)
    email_id = db.Column(db.Integer, db.ForeignKey(Profile.id), nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    verified = db.Column(db.Boolean, default=False)

    email_log = db.Column(db.Text)
