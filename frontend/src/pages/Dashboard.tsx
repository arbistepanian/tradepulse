import { useState, useTransition } from "react";
import SymbolInfoCard from "../components/dashboard/SymbolInfo";
import StockChart from "../components/dashboard/StockChart";
import NewsFeed from "../components/dashboard/NewsFeed";
import type { SymbolData } from "../lib/types/types";
import { fetchSymbolData } from "../lib/services/api";
import Heading from "../components/ui/Heading";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";

export default function DashboardPage() {
    const [data, setData] = useState<SymbolData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [symbol, setSymbol] = useState("");
    const [isPending, startTransaction] = useTransition();

    // useEffect(() => {
    //     const saved = localStorage.getItem("lastSymbolData");
    //     if (saved) {
    //         const parsed = JSON.parse(saved);
    //         if (parsed.symbol && parsed.data) {
    //             setData(parsed.data);
    //             setSymbol(parsed.symbol);
    //         }
    //     }
    // }, []);

    const fetchData = () => {
        if (!symbol || !symbol.trim()) {
            setError("Please enter a symbol");
            return;
        }
        if (symbol.length > 10) {
            setError("Symbol must be 10 characters or less.");
            return;
        }

        setError(null);

        startTransaction(async () => {
            try {
                const data = await fetchSymbolData(symbol);
                localStorage.setItem(
                    "lastSymbolData",
                    JSON.stringify({ symbol, data })
                );
                setData(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Something went wrong");
            }
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex w-full justify-start items-end gap-4">
                <div className="w-40">
                    <TextInput
                        label="Symbol"
                        name="symbol"
                        value={symbol}
                        onKeyDown={(e) => e.key === "Enter" && fetchData()}
                        onChange={(e) =>
                            setSymbol(e.target.value.toUpperCase())
                        }
                    />
                </div>
                <div className="w-full flex justify-start">
                    <Button onClick={fetchData} disabled={isPending}>
                        {isPending ? "Loading..." : "Search"}
                    </Button>
                </div>
            </div>
            {isPending && <p className="text-muted">Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {data && !isPending && !error && (
                <div>
                    <section className="mb-8">
                        <SymbolInfoCard info={data.symbol_info} />
                    </section>
                    <section className="mb-8">
                        <Heading
                            level={2}
                            className="text-lg font-semibold mb-4 text-center"
                        >
                            Price Chart (Last 30 Days)
                        </Heading>
                        <StockChart prices={data.prices} />
                    </section>

                    <section className="mb-8">
                        <Heading
                            level={2}
                            className="text-lg font-semibold mb-4 text-center"
                        >
                            Recent News
                        </Heading>
                        <NewsFeed articles={data.news_articles} />
                    </section>
                </div>
            )}
        </div>
    );
}
