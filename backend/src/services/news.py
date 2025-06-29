import requests
from datetime import datetime, timedelta, timezone
import feedparser
import os
from dotenv import load_dotenv

load_dotenv()

def fetch_news(symbol):
    FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")

    since = datetime.now(timezone.utc) - timedelta(days=7)
    all_articles = []
    all_articles += fetch_finnhub(FINNHUB_API_KEY, symbol, since)
    all_articles += fetch_yahoo_news(symbol, since)

    all_articles.sort(key=lambda x: x["published_at"], reverse=True)

    for a in all_articles:
        a["published_at"] = a["published_at"].isoformat()

    return all_articles


def fetch_finnhub(api_key: str, symbol: str, since: datetime):
    print("🗞️ Fetching Finnhub news (per-symbol)...")
    all_articles = []

    from_str = since.date().isoformat()
    to_str = datetime.now(timezone.utc).date().isoformat()

    url = f"https://finnhub.io/api/v1/company-news"
    params = {
        "symbol": symbol,
        "from": from_str,
        "to": to_str,
        "token": api_key
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()

        articles = [
            {
                "source": "finnhub",
                "title": a["headline"],
                "content": a.get("summary", ""),
                "symbol": symbol,
                "url": a["url"],
                "published_at": datetime.fromtimestamp(a["datetime"], tz=timezone.utc)
            }
            for a in response.json()
        ]
        print(f"📄 Finnhub {symbol}: {len(articles)} articles")
        all_articles.extend(articles)
    except Exception as e:
        print(f"⚠️ Error fetching news for {symbol}: {e}")

    print(f"✅ Fetched {len(all_articles)} total articles from Finnhub")
    return all_articles

def fetch_yahoo_news(symbol: str, since: datetime):
    url = f"https://feeds.finance.yahoo.com/rss/2.0/headline?s={symbol}&region=US&lang=en-US"
    print(f"🗞️ Fetching Yahoo Finance news for {symbol}...")
    
    all_articles = []

    try:
        feed = feedparser.parse(url)

        for entry in feed.entries:
            published = datetime(*entry.published_parsed[:6], tzinfo=timezone.utc)
            if published > since:
                all_articles.append({
                    "source": "yahoo",
                    "title": entry.title,
                    "url": entry.link if entry.link else None,
                    "content": entry.get("summary", ""),
                    "symbol": symbol,
                    "published_at": published
                })

    except Exception as e:
        print(f"⚠️ Failed to fetch batch {symbol}: {e}")

    print(f"✅ Fetched {len(all_articles)} articles from Yahoo Finance")
    return all_articles