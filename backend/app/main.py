from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.lifespan import lifespan

from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan,
)

app.include_router(auth_router)
app.include_router(users_router, prefix="/users", tags=["Users"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "CollectorGO Backend Running"
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }