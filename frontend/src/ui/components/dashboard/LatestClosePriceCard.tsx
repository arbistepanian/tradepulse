import type { FC } from "react";
import type { PriceEntry } from "../../../lib/types/types"; // Adjust path if needed
import Heading from "../Heading";

type Props = {
    prices1d: PriceEntry[];
};

const LatestClosePriceCard: FC<Props> = ({ prices1d }) => {
    const latest = prices1d[prices1d.length - 1];
    const previous = prices1d[prices1d.length - 2];

    const price = latest?.close ?? 0;
    const prevPrice = previous?.close ?? price;
    const change = price - prevPrice;
    const changePercent = (change / prevPrice) * 100;

    const trendColor =
        change > 0
            ? "text-green-600"
            : change < 0
            ? "text-red-600"
            : "text-gray-500";

    return (
        <div className="bg-surface p-4 rounded border border-[var(--border)] shadow-sm flex items-center space-x-4 mb-4 w-full">
            <div className="flex-1">
                <Heading level={2}>Latest Close Price</Heading>
                <p className="text-3xl font-semibold text-foreground">
                    ${price.toFixed(2)}
                </p>
                <p className={`text-sm mt-1 font-medium ${trendColor}`}>
                    {change >= 0 ? "+" : ""}
                    {change.toFixed(2)} ({changePercent.toFixed(2)}%)
                </p>
                <p className="text-xs text-muted mt-1">
                    As of {new Date(latest?.date).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default LatestClosePriceCard;
