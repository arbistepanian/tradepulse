import type { FC } from "react";

const LatestClosePriceCardSkeleton: FC = () => {
    return (
        <div className="bg-surface p-4 rounded border border-[var(--border)] shadow-sm flex items-center space-x-4 mb-4 animate-pulse w-full">
            <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-[var(--border)] rounded"></div>
                <div className="h-8 w-24 bg-[var(--border)] rounded"></div>
                <div className="h-4 w-20 bg-[var(--border)] rounded"></div>
                <div className="h-3 w-36 bg-[var(--border)] rounded"></div>
            </div>
        </div>
    );
};

export default LatestClosePriceCardSkeleton;
