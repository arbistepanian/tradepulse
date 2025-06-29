from fastapi import APIRouter
from .data import router as data_router
from .healthcheck import router as health_check_router

router = APIRouter()
router.include_router(data_router, prefix="/api/data/", tags=["data"])
router.include_router(health_check_router, prefix="/api/healthcheck/", tags=["health_check"])