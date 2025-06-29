import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
    className?: string;
}

export default function Label({ children, className, ...props }: LabelProps) {
    return (
        <label
            {...props}
            className={cn([
                "block text-sm font-medium text-[var(--foreground)] mb-1",
                className,
            ])}
        >
            {children}
        </label>
    );
}
