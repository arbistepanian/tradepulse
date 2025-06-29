import type { SymbolData } from "../types/types";

export async function fetchSymbolData(symbol: string): Promise<SymbolData> {
    const API_URL = import.meta.env.VITE_API_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    // console.log(`fetching data from ${API_URL}`);

    const response = await fetch(`${API_URL}/api/data?symbol=${symbol}`, {
        headers: {
            "X-API-KEY": API_KEY,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        //console.log(error);
        throw new Error(error.detail || "Unknown API error");
    }

    return await response.json();
}
