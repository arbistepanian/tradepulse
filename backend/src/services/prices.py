import yfinance as yf
import pandas as pd
from typing import List, Dict

def fetch_price_history(symbol: str, days: int = 30) -> List[Dict]:
    print(f"📈 Fetching {days}-day price history for {symbol}...")

    try:
        ticker = yf.Ticker(symbol)

        if days == 1:
            hist = ticker.history(period="2d", interval="1m")
            if hist.empty:
                print(f"⚠️ No intraday data for {symbol}")
                return []
            df = hist.copy()

        else:
            buffer_days = max(50, days + 20)  # extra padding for indicators
            hist = ticker.history(period=f"{buffer_days}d", interval="1d")
            if hist.empty:
                print(f"⚠️ No historical data for {symbol}")
                return []
            df = hist.copy()

        # --- Indicators ---
        df["SMA_7"] = df["Close"].rolling(window=7).mean()
        df["SMA_30"] = df["Close"].rolling(window=30).mean()

        df["EMA_7"] = df["Close"].ewm(span=7, adjust=False).mean()
        df["EMA_30"] = df["Close"].ewm(span=30, adjust=False).mean()

        df["MA_10"] = df["Close"].ewm(span=10, adjust=False).mean()
        df["MA_50"] = df["Close"].ewm(span=50, adjust=False).mean()

        df["RSI_14"] = compute_rsi(df["Close"], 14)

        ema_12 = df["Close"].ewm(span=12, adjust=False).mean()
        ema_26 = df["Close"].ewm(span=26, adjust=False).mean()
        df["MACD"] = ema_12 - ema_26
        df["MACD_signal"] = df["MACD"].ewm(span=9, adjust=False).mean()

        df["BB_MA_20"] = df["Close"].rolling(window=20).mean()
        df["BB_stddev"] = df["Close"].rolling(window=20).std()
        df["BB_upper"] = df["BB_MA_20"] + 2 * df["BB_stddev"]
        df["BB_lower"] = df["BB_MA_20"] - 2 * df["BB_stddev"]

        # --- Final trim ---
        if days == 1:
            latest_date = df.index[-1].date()
            df = df[df.index.date == latest_date]
            # RSI will have NaNs at the start due to rolling
            df = df.dropna(subset=["RSI_14", "MACD", "MACD_signal", "MA_10", "MA_50"])
        else:
            df = df.dropna(subset=["RSI_14", "MACD", "MACD_signal", "MA_10", "MA_50"])
            df = df.tail(days)  # only after we ensured indicators are computed

        # --- Format result ---
        result = []
        for date, row in df.iterrows():
            result.append({
                "symbol": symbol.upper(),
                "date": date.isoformat() if days == 1 else date.date().isoformat(),
                "close": round(row["Close"], 2),
                "volume": int(row["Volume"]),
                "sma_7": round_val(row["SMA_7"]),
                "sma_30": round_val(row["SMA_30"]),
                "ema_7": round_val(row["EMA_7"]),
                "ema_30": round_val(row["EMA_30"]),
                "ma_10": round_val(row["MA_10"]),
                "ma_50": round_val(row["MA_50"]),
                "rsi_14": round_val(row["RSI_14"]),
                "macd": round_val(row["MACD"]),
                "macd_signal": round_val(row["MACD_signal"]),
                "bb_upper": round_val(row["BB_upper"]),
                "bb_lower": round_val(row["BB_lower"]),
                "bb_ma": round_val(row["BB_MA_20"]),
            })

        print(f"✅ {symbol}: {len(result)} entries ({'1-minute' if days == 1 else 'daily'}) with indicators")
        return result

    except Exception as e:
        print(f"❌ Error fetching price history for {symbol}: {e}")
        return []

def compute_rsi(series: pd.Series, period: int = 14) -> pd.Series:
    delta = series.diff()
    gain = delta.where(delta > 0, 0).rolling(window=period).mean()
    loss = -delta.where(delta < 0, 0).rolling(window=period).mean()
    rs = gain / loss
    return 100 - (100 / (1 + rs))

def round_val(val):
    return round(val, 2) if pd.notna(val) else None
