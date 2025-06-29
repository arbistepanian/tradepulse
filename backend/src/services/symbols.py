from typing import Optional, Dict
import requests
import os 
from dotenv import load_dotenv

load_dotenv()

def fetch_symbol_info (symbol: str) -> Optional[Dict]:
    FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")

    return fetch_symbol_info_from_finnhub(FINNHUB_API_KEY, symbol)

def fetch_symbol_info_from_finnhub(api_key: str, symbol: str) -> Optional[Dict]:
    print(f"🗞️ Fetching symbol info for {symbol} from finnhub...")
    
    url = "https://finnhub.io/api/v1/stock/profile2"
    params = {
        "symbol": symbol.upper(),
        "token": api_key
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()

        if not data or "name" not in data:
            print(f"⚠️ No info found for symbol: {symbol}")
            return None

        return {
            "symbol": data.get("ticker", symbol.upper()),
            "name": data.get("name"),
            "sector": data.get("finnhubIndustry"),
            "industry": data.get("gsector") or data.get("finnhubIndustry"),  # fallback
            "exchange": data.get("exchange"),
            "country": data.get("country"),
            "weburl": data.get("weburl"),
            "logo": data.get("logo")
        }

    except requests.RequestException as e:
        print(f"❌ Error fetching symbol info from Finnhub: {e}")
        return None