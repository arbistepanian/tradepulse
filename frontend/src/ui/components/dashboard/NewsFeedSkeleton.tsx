import type { FC } from "react";

const NewsFeedSkeleton: FC = () => {
    const dummyArticles = Array.from({ length: 5 });

    return (
        <div className="bg-surface p-4 rounded border border-[var(--border)] shadow-sm mt-6 animate-pulse">
            {/* Top pagination bar */}
            <div className="flex justify-center items-center gap-4 border-[var(--border)] border-b pb-4 mb-4">
                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
            </div>

            {/* Article list skeletons */}
            <ul className="space-y-4">
                {dummyArticles.map((_, idx) => (
                    <li
                        key={idx}
                        className="border-b border-[var(--border)] pb-3"
                    >
                        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                        <div className="flex items-center gap-2 text-sm mb-2">
                            <div className="h-5 w-16 rounded bg-gray-300 dark:bg-gray-700" />
                            <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-700" />
                        </div>
                        <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded mb-1" />
                        <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
                    </li>
                ))}
            </ul>

            {/* Bottom pagination bar */}
            <div className="flex justify-center items-center mt-6 gap-4">
                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
            </div>
        </div>
    );
};

export default NewsFeedSkeleton;
