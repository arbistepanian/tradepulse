import { useState, useEffect, useTransition, useRef } from "react";
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
import LatestClosePriceCardSkeleton from "../ui/components/dashboard/LatestClosePriceCardSkeleton";
import LatestClosePriceCard from "../ui/components/dashboard/LatestClosePriceCard";

export default function DashboardPage() {
    const [data, setData] = useState<SymbolData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [symbol, setSymbol] = useState("");
    const [isPending, startTransaction] = useTransition();
    const [recentSymbols, setRecentSymbols] = useState<string[]>(() => {
        const saved = localStorage.getItem("recentSymbols");
        return saved ? JSON.parse(saved) : [];
    });
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

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

    const updateRecentSymbols = (newSymbol: string) => {
        setRecentSymbols((prev) => {
            const filtered = prev.filter((s) => s !== newSymbol);
            const updated = [newSymbol, ...filtered].slice(0, 10);
            localStorage.setItem("recentSymbols", JSON.stringify(updated));
            return updated;
        });
    };

    const fetchData = () => {
        setShowDropdown(false);
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
                updateRecentSymbols(symbol);
            } catch (err) {
                console.error(err);
                setError(err.message || "Something went wrong");
            }
        });
    };

    const handleSelectRecent = (s: string) => {
        setSymbol(s);
        setShowDropdown(false);
        inputRef.current?.focus();
        fetchData();
    };

    useEffect(() => {
        if (!showDropdown) return;
        const handler = (e: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(e.target as Node)
            ) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [showDropdown]);

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
                    <div className="relative w-40">
                        <TextInput
                            label="Symbol"
                            name="symbol"
                            ref={inputRef}
                            onFocus={() => setShowDropdown(true)}
                            onClick={() => setShowDropdown(true)}
                            onBlur={() =>
                                setTimeout(() => setShowDropdown(false), 150)
                            }
                            value={symbol}
                            onKeyDown={(e) => e.key === "Enter" && fetchData()}
                            onChange={(e) =>
                                setSymbol(e.target.value.toUpperCase())
                            }
                        />
                        {showDropdown && recentSymbols.length > 0 && (
                            <div className="absolute left-0 mt-2 w-56 bg-[var(--background)] shadow-lg rounded-md p-0 z-10 border border-border overflow-hidden">
                                {recentSymbols.map((s) => (
                                    <div
                                        key={s}
                                        className="flex items-center justify-between px-3 py-2 text-foreground cursor-pointer hover:bg-[var(--primary)]"
                                        onMouseDown={() =>
                                            handleSelectRecent(s)
                                        }>
                                        {s}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="w-full flex justify-start">
                        <Button
                            onClick={fetchData}
                            disabled={isPending}
                            className="w-30">
                            {isPending ? "Loading..." : "Search"}
                        </Button>
                    </div>
                </div>
                {error && <p className="text-red-500">Error: {error}</p>}
                {isPending && !error && (
                    <div>
                        <section className="mb-8 flex flex-col md:flex-row gap-4">
                            <LatestClosePriceCardSkeleton />
                            <SymbolInfoCardSkeleton />
                        </section>
                        <section className="mb-8">
                            <Heading
                                level={2}
                                className="text-lg font-semibold mb-4 text-center">
                                Price Chart
                            </Heading>
                            <StockChartSkeleton />
                        </section>

                        <section className="mb-8">
                            <Heading
                                level={2}
                                className="text-lg font-semibold mb-4 text-center">
                                Recent News
                            </Heading>
                            <NewsFeedSkeleton />
                        </section>
                    </div>
                )}
                {data && !isPending && !error && (
                    <div>
                        <section className="mb-8 flex flex-col md:flex-row gap-4">
                            <LatestClosePriceCard
                                prices1d={data.prices["1d"]}
                            />
                            <SymbolInfoCard info={data.symbol_info} />
                        </section>
                        <section className="mb-8">
                            <Heading
                                level={2}
                                className="text-lg font-semibold mb-4 text-center">
                                Price Chart
                            </Heading>
                            <StockChart prices={data.prices} />
                        </section>

                        <section className="mb-8">
                            <Heading
                                level={2}
                                className="text-lg font-semibold mb-4 text-center">
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
