import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
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
    yield
    print("Shutting down...")

app = FastAPI(lifespan=lifespan)

# ✅ CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routes
app.include_router(router)
