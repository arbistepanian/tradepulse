import type { SelectHTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import Label from "./Label";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: {
        value: string;
        label: string;
    }[];
}

export default function Select({
    label,
    id,
    className,
    options,
    ...props
}: SelectProps) {
    return (
        <div className="flex w-full flex-col justify-start gap-2">
            {label && (
                <Label htmlFor={id} className="mb-1">
                    {label}
                </Label>
            )}
            <select
                id={id}
                {...props}
                className={cn(
                    "w-full px-4 py-2 rounded border appearance-none focus:outline-none focus:ring-2",
                    "bg-[var(--background)] text-[var(--foreground)] border-[var(--muted)] focus:ring-[var(--primary)]",
                    className
                )}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
