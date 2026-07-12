from app.core.security import create_access_token
from app.utils.password import verify_password

#TEmp user
FAKE_USER = {
    "username": "admin",
    "password_hash": "$2b$12$M5S3kV2nMvnH7mG5rA5F4ebnI2eY0eY6A7q3OwCYeX1uY1hN2qqA2",
}

class AuthService:

    @staticmethod
    def login(
        username: str,
        password: str,
    ):

        if username != FAKE_USER["username"]:
            return None

        if not verify_password(
            password,
            FAKE_USER["password_hash"],
        ):
            return None

        token = create_access_token(username)

        return token