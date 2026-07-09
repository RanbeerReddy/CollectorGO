from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.core.logging import configure_logging


@asynccontextmanager
async def lifespan(app: FastAPI):

    configure_logging()

    print("CollectorGO API Started")

    yield

    print("CollectorGO API Stopped")