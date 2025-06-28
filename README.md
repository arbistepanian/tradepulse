# TradePulse

**TradePulse** is a lightweight stock insight app that brings you:

- 📈 Mini price charts (7-day & 30-day)
- 🏢 Key company facts (sector, CEO, founded date, etc.)
- 🗞️ Trending news tags (from headlines)

Built with:
- **Backend**: FastAPI + PostgreSQL
- **Frontend**: React + Vite + Tailwind CSS
- **Data Sources**: Yahoo Finance, Finnhub (free tiers)

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

# Set your database URL
export DATABASE_URL=postgres://user:pass@host:port/dbname

uvicorn main:app --reload
```

Backend runs at `http://127.0.0.1:8000`

---

### 3. 🖥️ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`, proxying API calls to the backend.

---

## 🗂️ Project Structure

```
tradepulse/
├── backend/         # FastAPI backend
│   ├── routers/     # price.py, news.py, company.py
│   ├── services/    # yahoo.py, finnhub.py, tag_extractor.py
│   ├── models/
│   ├── db.py
│   └── main.py
│
├── frontend/        # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── api/
│   ├── public/
│   └── index.html
│
└── README.md
```

---

## 🌐 Deployment

- **Frontend**: Deploy via [Vercel](https://vercel.com) — point to the `frontend/` directory.
- **Backend**: Deploy via [Render](https://render.com), [Fly.io](https://fly.io), or your preferred cloud/VPS.
  - Set `DATABASE_URL` environment variable
  - (Optional) Schedule a daily job to refresh price/news data

---

## ✅ Contribution

Feel free to fork and contribute!

Ideas for enhancement:
- 📅 Add earnings calendar or countdown
- 📊 Include volatility tracker
- 🔍 Compare two tickers side-by-side
- ⭐ Local watchlist with bookmarks

---

## 📄 License

MIT License

## 🙋‍♂️ Author

Made by @ArbiStepanian  
