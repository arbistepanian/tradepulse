from fastapi import APIRouter
from .data import router as data_router

router = APIRouter()
router.include_router(data_router, prefix="/api/data", tags=["data"])