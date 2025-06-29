from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("")
def heath_check():
    return JSONResponse({"status": "ok"})