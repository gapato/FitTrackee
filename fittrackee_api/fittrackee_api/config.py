import os

from flask import current_app

MAX_FILE_SIZE = 1 * 1024 * 1024  # 1MB


class BaseConfig:
    """Base configuration"""

    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    BCRYPT_LOG_ROUNDS = 13
    TOKEN_EXPIRATION_DAYS = 30
    TOKEN_EXPIRATION_SECONDS = 0
    UPLOAD_FOLDER = os.path.join(current_app.root_path, 'uploads')
    # for gpx zip
    MAX_CONTENT_LENGTH = int(
        os.environ.get('REACT_APP_MAX_ZIP_FILE_SIZE', MAX_FILE_SIZE * 10)
    )
    # for single file (gpx or picture)
    MAX_SINGLE_FILE = int(
        os.environ.get('REACT_APP_MAX_SINGLE_FILE_SIZE', MAX_FILE_SIZE)
    )
    PICTURE_ALLOWED_EXTENSIONS = {'jpg', 'png', 'gif'}
    ACTIVITY_ALLOWED_EXTENSIONS = {'gpx', 'zip'}
    REGISTRATION_ALLOWED = (
        False if os.getenv('REACT_APP_ALLOW_REGISTRATION') == "false" else True
    )


class DevelopmentConfig(BaseConfig):
    """Development configuration"""

    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SECRET_KEY = 'development key'
    USERNAME = 'admin'
    PASSWORD = 'default'
    BCRYPT_LOG_ROUNDS = 4


class TestingConfig(BaseConfig):
    """Testing configuration"""

    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_TEST_URL')
    SECRET_KEY = 'test key'
    USERNAME = 'admin'
    PASSWORD = 'default'
    BCRYPT_LOG_ROUNDS = 4
    TOKEN_EXPIRATION_DAYS = 0
    TOKEN_EXPIRATION_SECONDS = 3
