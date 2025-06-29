import type { FC } from "react";

const StockChartSkeleton: FC = () => {
    return (
        <div className="w-full bg-surface rounded-lg p-4 border border-[var(--border)] shadow-sm animate-pulse">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="flex items-center gap-2">
                    <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
                    <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
                </div>
            </div>
            <div className="h-[300px] w-full bg-gray-200 dark:bg-gray-800 rounded-md" />
        </div>
    );
};

export default StockChartSkeleton;
