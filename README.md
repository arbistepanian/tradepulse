# TradePulse

**TradePulse** is a lightweight stock insight app that brings you:

-   📈 Mini price charts with technical indicators (SMA, EMA, MACD, RSI, Bollinger Bands)
-   🏢 Key company facts (sector, CEO, founded date, exchange, etc.)
-   🗞️ Trending news
-   🧠 Intelligent backend using Yahoo Finance + Finnhub APIs

Built with:

-   **Backend**: Python + FastAPI
-   **Frontend**: React + Vite + Tailwind CSS + Chart.js
-   **APIs**: Yahoo Finance, Finnhub (free tier)

---

## 🚀 Quick Start

### 1. 🔧 Clone the repo

```bash
git clone https://github.com/arbistepanian/tradepulse.git
cd tradepulse
```

---

### 2. ⚙️ Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate      # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt

# Set your env variables
FRONTEND_URL
FINNHUB_API_KEY
API_KEY

uvicorn src.main:app
```

Backend runs at `http://localhost:8000`

---

### 3. 🖥️ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`, proxying API calls to the backend.

---

## 🌐 Deployment

-   **Frontend**: Deploy via [Vercel](https://vercel.com) — point to the `frontend/` directory.
-   **Backend**: Deploy via [Fly.io](https://fly.io)
    -   Create a `fly.toml` and Dockerfile (already included)
    -   Run `fly launch` to deploy
    -   Set env vars using `fly secrets set`
    -   VM size: `shared-cpu-1x`, 256MB-512MB is usually sufficient

---

## ✅ Contribution

Feel free to fork and contribute!

Ideas for enhancement:

-   📅 Add earnings calendar or countdown
-   🔍 Compare two tickers side-by-side
-   ⭐ Watchlist with bookmarks + sector filters
-   📊 More technical indicators (ADX, VWAP, etc.)

---

## 📄 License

MIT License

## 🙋‍♂️ Author

Made by [@ArbiStepanian](https://github.com/arbistepanian)
