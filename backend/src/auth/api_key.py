# src/auth/api_key.py
from fastapi import Header, HTTPException
import os

def verify_api_key(x_api_key: str = Header(None)):
    expected_key = os.getenv("API_KEY")

    if x_api_key != expected_key:
        raise HTTPException(status_code=401, detail="Invalid or missing API key")
