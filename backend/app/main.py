from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.lifespan import lifespan

from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.forms import router as forms_router
from app.api.v1.form_assignments import router as assignments_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/v1")
app.include_router(users_router, prefix="/api/v1/users", tags=["Users"])
app.include_router(forms_router, prefix="/api/v1")
app.include_router(assignments_router, prefix="/api/v1")


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