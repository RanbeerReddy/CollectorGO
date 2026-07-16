import asyncio
import logging

from app.core.config import settings
from app.db.session import AsyncSessionLocal
from app.models.enums import UserRole
from app.repositories import organization_repository
from app.repositories import user_repository
from app.schemas.user import UserCreate
from app.services import user_service

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def seed():
    logger.info("Starting database seed...")
    async with AsyncSessionLocal() as session:
        # 1. Seed Organization
        org_code = "collector-demo"
        org = await organization_repository.get_by_code(session, org_code)
        if not org:
            logger.info(f"Organization '{org_code}' not found. Creating...")
            org = await organization_repository.create(
                session,
                {"name": "CollectorGO Demo", "code": org_code},
            )
            logger.info(f"Organization created with ID: {org.id}")
        else:
            logger.info(f"Organization '{org_code}' already exists.")

        # 2. Seed Admin User
        admin_username = "admin"
        admin_email = "admin@collectorgo.com"
        
        existing_user = await user_repository.get_by_username(session, admin_username)
        if not existing_user:
            logger.info(f"Admin user '{admin_username}' not found. Creating...")
            user_in = UserCreate(
                username=admin_username,
                email=admin_email,
                full_name="System Admin",
                password="Admin@123",
                role=UserRole.ADMIN,
                organization_id=org.id,
            )
            try:
                user = await user_service.create_user(session, user_in)
                logger.info(f"Admin user created with ID: {user.id}")
            except Exception as e:
                logger.error(f"Failed to create admin user: {e}")
        else:
            logger.info(f"Admin user '{admin_username}' already exists.")

    logger.info("Database seed completed.")


if __name__ == "__main__":
    asyncio.run(seed())
