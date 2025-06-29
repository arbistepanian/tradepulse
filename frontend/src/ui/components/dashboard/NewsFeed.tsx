import { useState, useMemo } from "react";
import Button from "../Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import type { NewsArticle } from "../../../lib/types/types";

interface NewsFeedProps {
    articles: NewsArticle[];
    itemsPerPage?: number;
}

export default function NewsFeed({
    articles,
    itemsPerPage = 10,
}: NewsFeedProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedIndexes, setExpandedIndexes] = useState<
        Record<number, boolean>
    >({});

    const totalPages = Math.ceil(articles.length / itemsPerPage);

    const paginatedArticles = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return articles.slice(start, start + itemsPerPage);
    }, [articles, currentPage, itemsPerPage]);

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    const toggleExpanded = (index: number) => {
        setExpandedIndexes((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const getSourceBadgeClass = (source: string) => {
        switch (source.toLowerCase()) {
            case "yahoo":
                return "bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-100";
            case "finnhub":
                return "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100";
            default:
                return "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
        }
    };

    const getPreview = (content: string) => {
        const sentences = content.split(/(?<=[.?!])\s+/);
        return sentences.slice(0, 2).join(" ");
    };

    return (
        <div className="bg-surface p-4 rounded border border-[var(--border)] shadow-sm mt-6">
            <div className="flex justify-center items-center gap-4 border-[var(--border)] border-b pb-4 mb-4">
                <Button
                    variant="secondary"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 disabled:opacity-50 rounded-full p-2"
                >
                    <ChevronLeftIcon className="w-4 h-4" />
                </Button>

                <span className="text-sm text-muted">
                    Page {currentPage} of {totalPages}
                </span>

                <Button
                    variant="secondary"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 disabled:opacity-50 rounded-full p-2"
                >
                    <ChevronRightIcon className="w-4 h-4" />
                </Button>
            </div>

            <ul className="space-y-4">
                {paginatedArticles.map((article, idx) => {
                    const globalIdx = (currentPage - 1) * itemsPerPage + idx;
                    const isExpanded = expandedIndexes[globalIdx];
                    const content = isExpanded
                        ? article.content
                        : getPreview(article.content);

                    return (
                        <li
                            key={idx}
                            className="border-b border-[var(--border)] pb-3"
                        >
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary font-medium hover:underline"
                            >
                                {article.title}
                            </a>
                            <div className="flex items-center gap-2 text-sm text-muted mt-1">
                                <span
                                    className={`px-2 py-0.5 text-xs font-medium rounded ${getSourceBadgeClass(
                                        article.source
                                    )}`}
                                >
                                    {article.source}
                                </span>
                                <span>
                                    {new Date(
                                        article.published_at
                                    ).toLocaleString()}
                                </span>
                            </div>

                            {article.content && (
                                <div className="text-sm text-foreground mt-2 whitespace-pre-wrap">
                                    {content}
                                    {!isExpanded &&
                                        article.content !== content && (
                                            <>
                                                {" "}
                                                <button
                                                    onClick={() =>
                                                        toggleExpanded(
                                                            globalIdx
                                                        )
                                                    }
                                                    className="text-primary text-xs ml-1 bg-[var(--surface)] text-[var(--foreground)] rounded-sm px-2 cursor-pointer"
                                                >
                                                    More...
                                                </button>
                                            </>
                                        )}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>

            <div className="flex justify-center items-center mt-6 gap-4">
                <Button
                    variant="secondary"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 disabled:opacity-50 rounded-full p-2"
                >
                    <ChevronLeftIcon className="w-4 h-4" />
                </Button>

                <span className="text-sm text-muted">
                    Page {currentPage} of {totalPages}
                </span>

                <Button
                    variant="secondary"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 disabled:opacity-50 rounded-full p-2"
                >
                    <ChevronRightIcon className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
