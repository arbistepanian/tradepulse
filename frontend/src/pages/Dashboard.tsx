import { useState, useEffect, useTransition } from "react";
import SymbolInfoCard from "../ui/components/dashboard/SymbolInfo";
import StockChart from "../ui/components/dashboard/StockChart";
import NewsFeed from "../ui/components/dashboard/NewsFeed";
import type { SymbolData } from "../lib/types/types";
import { fetchSymbolData } from "../lib/services/api";
import Heading from "../ui/components/Heading";
import TextInput from "../ui/components/TextInput";
import Button from "../ui/components/Button";
import NewsFeedSkeleton from "../ui/components/dashboard/NewsFeedSkeleton";
import StockChartSkeleton from "../ui/components/dashboard/StockChartSkeleton";
import SymbolInfoCardSkeleton from "../ui/components/dashboard/SymbolInfoCardSkeleton";

export default function DashboardPage() {
    const [data, setData] = useState<SymbolData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [symbol, setSymbol] = useState("");
    const [isPending, startTransaction] = useTransition();

    useEffect(() => {
        const saved = localStorage.getItem("lastSymbolData");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.symbol && parsed.data) {
                setData(parsed.data);
                setSymbol(parsed.symbol);
            }
        }
    }, []);

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
        <>
            <title>Dashboard - TradePulse</title>
            <meta
                name="description"
                content="Get mini price charts, key company facts, and trending financial news at a glance with TradePulse."
            />
            <meta property="og:title" content="Dashboard - TradePulse" />
            <meta
                property="og:description"
                content="Smarter stock insights with charts, company data, and trending news tags."
            />
            <meta
                property="og:image"
                content="https://tradepulse-lite.vercel.app/home-page-hero.jpg"
            />
            <meta
                property="og:url"
                content="https://tradepulse-lite.vercel.app"
            />
            <meta name="twitter:card" content="summary_large_image" />

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
                {error && <p className="text-red-500">Error: {error}</p>}
                {isPending && !error && (
                    <div>
                        <section className="mb-8">
                            <SymbolInfoCardSkeleton />
                        </section>
                        <section className="mb-8">
                            <Heading
                                level={2}
                                className="text-lg font-semibold mb-4 text-center"
                            >
                                Price Chart
                            </Heading>
                            <StockChartSkeleton />
                        </section>

                        <section className="mb-8">
                            <Heading
                                level={2}
                                className="text-lg font-semibold mb-4 text-center"
                            >
                                Recent News
                            </Heading>
                            <NewsFeedSkeleton />
                        </section>
                    </div>
                )}
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
                                Price Chart
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
        </>
    );
}
