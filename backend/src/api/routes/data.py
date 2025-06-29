from fastapi import APIRouter, Header, Query, HTTPException, Depends
from src.services.news import fetch_news
from src.services.prices import fetch_price_history
from src.services.symbols import fetch_symbol_info
from fastapi.responses import JSONResponse
from src.auth.api_key import verify_api_key
import re

router = APIRouter()

@router.get("")
def get_symbol_data(
    symbol: str = Query("AAPL"),
    user: dict = Depends(verify_api_key)
):
    symbol = symbol.upper()

    if not re.match(r"^[A-Z0-9.-]+$", symbol):
        raise HTTPException(status_code=400, detail="Invalid symbol format")

    try:
        news_articles = fetch_news(symbol)
    except Exception as e:
        print(f"❌ News fetch failed: {e}")
        news_articles = []

    try:
        prices_1 = fetch_price_history(symbol, 1)
        prices_7 = fetch_price_history(symbol, 7)
        prices_30 = fetch_price_history(symbol, 30)
        prices_90 = fetch_price_history(symbol, 90)
    except Exception as e:
        print(f"❌ Price fetch failed: {e}")
        prices_1 = prices_7 = prices_30 = prices_90 = []

    try:
        symbol_info = fetch_symbol_info(symbol)
    except Exception as e:
        print(f"❌ Symbol info fetch failed: {e}")
        symbol_info = {}

    response = {
        "status": "success",
        "symbol_info": symbol_info,
        "news_articles": news_articles,
        "prices": {
            "1d": prices_1,
            "7d": prices_7,
            "30d": prices_30,
            "90d": prices_90
        }
    }
    
    return JSONResponse(content=response, headers={"Cache-Control": "public, max-age=300"})


