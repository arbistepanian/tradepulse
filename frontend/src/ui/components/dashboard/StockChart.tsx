// StockChart.tsx
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { useMemo, useState } from "react";
import type { ChartOptions, ChartData } from "chart.js";
import type { PriceEntry } from "../../../lib/types/types";

import Select from "../Select";
import Heading from "../Heading";
import ToggleSwitch from "../ToggleSwitch";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Button from "../Button";

ChartJS.register(
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

type StockChartProps = {
    prices: {
        "1d": PriceEntry[];
        "7d": PriceEntry[];
        "30d": PriceEntry[];
        "90d": PriceEntry[];
    };
};

const INDICATORS = [
    { key: "sma_7", label: "SMA 7" },
    { key: "sma_30", label: "SMA 30" },
    { key: "ema_7", label: "EMA 7" },
    { key: "ema_30", label: "EMA 30" },
    { key: "ma_10", label: "MA 10" },
    { key: "ma_50", label: "MA 50" },
    { key: "bb_upper", label: "Bollinger Upper" },
    { key: "bb_lower", label: "Bollinger Lower" },
    { key: "bb_ma", label: "Bollinger MA" },
    { key: "rsi_14", label: "RSI 14" },
    { key: "macd", label: "MACD" },
    { key: "macd_signal", label: "MACD Signal" },
];

const INDICATOR_COLORS: Record<string, string> = {
    sma_7: "#3B82F6", // Blue
    sma_30: "#1E40AF", // Darker Blue

    ema_7: "#10B981", // Emerald
    ema_30: "#065F46", // Dark Green

    ma_10: "#FBBF24", // Yellow
    ma_50: "#D97706", // Dark Orange

    rsi_14: "#A855F7", // Purple

    macd: "#EF4444", // Red
    macd_signal: "#6B7280", // Gray

    bb_upper: "#38BDF8", // Sky Blue
    bb_lower: "#94A3B8", // Slate
    bb_ma: "#0EA5E9", // Lighter Blue
};

export default function StockChart({ prices }: StockChartProps) {
    const [timeframe, setTimeframe] = useState<"1d" | "7d" | "30d" | "90d">(
        "30d"
    );
    const [showDropdown, setShowDropdown] = useState(false);
    const [enabledIndicators, setEnabledIndicators] = useState<
        Record<string, boolean>
    >({});

    const toggleIndicator = (key: string) => {
        setEnabledIndicators((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const data = prices[timeframe];

    const chartData: ChartData<"line"> = useMemo(() => {
        const labels = data.map((d) => new Date(d.date));
        const datasets = [
            {
                label: "Price",
                data: data.map((d) => d.close),
                borderColor: "rgba(99, 102, 241, 1)",
                backgroundColor: "rgba(99, 102, 241, 0.1)",
                fill: true,
                tension: 0.3,
                pointRadius: 0,
                yAxisID: "yPrice",
            },
            ...INDICATORS.filter((ind) => enabledIndicators[ind.key]).map(
                (ind) => {
                    const yAxisID =
                        ind.key === "rsi_14"
                            ? "yRSI"
                            : ind.key.startsWith("macd")
                            ? "yMACD"
                            : "yPrice";

                    return {
                        label: ind.label,
                        data: data.map((d) => (d as any)[ind.key]),
                        borderColor: INDICATOR_COLORS[ind.key],
                        backgroundColor: "transparent",
                        borderDash:
                            ind.key === "rsi_14" || ind.key.startsWith("macd")
                                ? []
                                : [4, 4],
                        borderWidth: 1,
                        pointRadius: 0,
                        tension: 0.2,
                        fill: true,
                        yAxisID,
                    };
                }
            ),
        ];
        return { labels, datasets };
    }, [data, enabledIndicators]);

    const options: ChartOptions<"line"> = useMemo(() => {
        const showRSI = enabledIndicators["rsi_14"];
        const showMACD =
            enabledIndicators["macd"] || enabledIndicators["macd_signal"];

        const baseOptions: ChartOptions<"line"> = {
            responsive: true,
            interaction: {
                mode: "index" as const, // ✅ Important: specify literal type
                intersect: false,
            },
            plugins: {
                legend: {
                    position: "top",
                    labels: { color: "var(--foreground)" },
                },
            },
            scales: {
                x: {
                    type: "time",
                    time: {
                        unit: timeframe === "1d" ? "minute" : "day",
                    },
                    ticks: {
                        color: "var(--foreground)",
                    },
                    title: {
                        display: true,
                        text: "Time",
                        color: "var(--foreground)",
                    },
                },
                yPrice: {
                    type: "linear",
                    display: true,
                    position: "left",
                    stack: "price",
                    weight: 3,
                    stackWeight: 4,
                    title: {
                        display: true,
                        text: "Price ($)",
                        color: "var(--foreground)",
                    },
                    ticks: { color: "var(--foreground)" },
                    grid: { color: "rgba(255,255,255,0.05)" },
                },
                ...(showRSI && {
                    yRSI: {
                        type: "linear",
                        display: true,
                        position: "left",
                        stack: "price",
                        weight: 2,
                        stackWeight: 1,
                        min: 0,
                        max: 100,
                        title: {
                            display: true,
                            text: "RSI (14)",
                            color: "var(--foreground)",
                        },
                        ticks: { color: "var(--foreground)" },
                        grid: { color: "rgba(255,255,255,0.05)" },
                    },
                }),
                ...(showMACD && {
                    yMACD: {
                        type: "linear",
                        display: true,
                        position: "left",
                        stack: "price",
                        weight: 1,
                        stackWeight: 1,
                        title: {
                            display: true,
                            text: "MACD",
                            color: "var(--foreground)",
                        },
                        ticks: { color: "var(--foreground)" },
                        grid: { color: "rgba(255,255,255,0.05)" },
                    },
                }),
            },
        };

        return baseOptions;
    }, [timeframe, enabledIndicators]);

    return (
        <div className="w-full bg-surface rounded-lg p-4 border border-[var(--border)] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <Heading level={2}>Stock Chart</Heading>
                <div className="flex justify-end items-center gap-2">
                    <div className="relative">
                        <Button
                            variant="secondary"
                            onClick={() => setShowDropdown((s) => !s)}
                            className="flex items-center gap-1"
                        >
                            Indicators <ChevronDownIcon className="w-4 h-4" />
                        </Button>
                        {showDropdown && (
                            <div className="absolute left-0 mt-2 w-56 bg-[var(--background)] shadow-lg rounded-md p-3 z-10 border border-border">
                                {INDICATORS.map((ind) => (
                                    <div
                                        key={ind.key}
                                        className="flex items-center justify-between py-1"
                                    >
                                        <span className="text-sm text-foreground">
                                            {ind.label}
                                        </span>
                                        <ToggleSwitch
                                            id={ind.key}
                                            checked={
                                                !!enabledIndicators[ind.key]
                                            }
                                            onChange={() =>
                                                toggleIndicator(ind.key)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="w-40">
                        <Select
                            id="timeframe"
                            value={timeframe}
                            onChange={(e) =>
                                setTimeframe(
                                    e.target.value as
                                        | "1d"
                                        | "7d"
                                        | "30d"
                                        | "90d"
                                )
                            }
                            options={[
                                { value: "1d", label: "1 Day" },
                                { value: "7d", label: "7 Days" },
                                { value: "30d", label: "30 Days" },
                                { value: "90d", label: "90 Days" },
                            ]}
                        />
                    </div>
                </div>
            </div>

            <Line data={chartData} options={options} />
        </div>
    );
}
