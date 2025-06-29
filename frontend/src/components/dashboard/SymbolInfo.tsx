import type { FC } from "react";
import type { SymbolInfo } from "../../lib/types/types"; // Adjust import path if needed

type Props = {
    info: SymbolInfo;
};

const SymbolInfoCard: FC<Props> = ({ info }) => {
    const { name, industry, exchange, currency, country, logo } = info;

    return (
        <div className="bg-surface p-4 rounded border border-[var(--border)] shadow-sm flex items-start space-x-4 mb-4">
            {logo && (
                <img
                    src={logo}
                    alt={`${name || "Company"} logo`}
                    className="w-12 h-12 rounded bg-white object-contain border border-border"
                />
            )}
            <div className="flex-1">
                <h2 className="text-lg font-bold text-primary">
                    {name || "Unnamed Company"}
                </h2>
                <ul className="text-sm text-text-secondary space-y-1 mt-2">
                    {industry && (
                        <li>
                            <span className="font-medium text-foreground">
                                Industry:
                            </span>{" "}
                            {industry}
                        </li>
                    )}
                    {exchange && (
                        <li>
                            <span className="font-medium text-foreground">
                                Exchange:
                            </span>{" "}
                            {exchange}
                        </li>
                    )}
                    {currency && (
                        <li>
                            <span className="font-medium text-foreground">
                                Currency:
                            </span>{" "}
                            {currency}
                        </li>
                    )}
                    {country && (
                        <li>
                            <span className="font-medium text-foreground">
                                Country:
                            </span>{" "}
                            {country}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SymbolInfoCard;
