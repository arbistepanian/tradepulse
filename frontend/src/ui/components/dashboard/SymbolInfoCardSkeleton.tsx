import type { FC } from "react";

const SymbolInfoCardSkeleton: FC = () => {
    return (
        <div className="bg-surface p-4 rounded border border-[var(--border)] shadow-sm flex items-start space-x-4 mb-4 animate-pulse w-full">
            <div className="w-12 h-12 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="flex-1 space-y-2">
                <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="space-y-1 mt-2">
                    <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-600 rounded" />
                    <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-600 rounded" />
                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-600 rounded" />
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-600 rounded" />
                </div>
            </div>
        </div>
    );
};

export default SymbolInfoCardSkeleton;
