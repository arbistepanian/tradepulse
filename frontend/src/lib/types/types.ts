export type PriceEntry = {
    symbol: string;
    date: string;
    close: number;
    volume: number;
    sma_7?: number;
    sma_30?: number;
    ema_7?: number;
    ema_30?: number;
    rsi_14?: number;
    macd?: number;
    macd_signal?: number;
    bb_upper?: number;
    bb_lower?: number;
    bb_ma?: number;
};

export type NewsArticle = {
    source: string;
    title: string;
    url: string;
    published_at: string;
    content: string;
};

export type SymbolInfo = {
    name?: string;
    industry?: string;
    exchange?: string;
    currency?: string;
    country?: string;
    logo?: string;
    [key: string]: any;
};

export type SymbolData = {
    status: string;
    news_articles: NewsArticle[];
    symbol_info: SymbolInfo;
    prices: {
        "1d": PriceEntry[];
        "7d": PriceEntry[];
        "30d": PriceEntry[];
        "90d": PriceEntry[];
    };
};
