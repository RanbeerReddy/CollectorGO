from fastapi import FastAPI

app = FastAPI(
    title="CollectorGO API",
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
    