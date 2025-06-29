import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse  # Import RedirectResponse
from src.api.routes import router
from contextlib import asynccontextmanager
from dotenv import load_dotenv

load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL")
ENVIRONMENT = os.getenv("ENV", "development")  # add this to your `.env`

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up...")
    for route in app.routes:
        print(route.path, route.methods)
    print(f"FRONTEND_URL: {FRONTEND_URL}")

    yield
    print("Shutting down...")

app = FastAPI(lifespan=lifespan)

# ✅ CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routes
app.include_router(router)
