from fastapi import FastAPI
from app.core.config import settings


app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="Backend API for CollectorGO",

)

@app.get("/")
async def root():
    return { "message": "CollectorGO Backend Running"}


@app.get('/health')
async def health():
    return {
        "status": "healthy"
        }
    