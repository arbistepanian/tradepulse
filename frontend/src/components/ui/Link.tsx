import { Link as RouterLink } from "react-router-dom";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface LinkProps {
    to: string;
    children: ReactNode;
    variant?: "link" | "button";
    target?: "_blank" | "_self" | "_parent" | "_top";
    className?: string;
}

export default function Link({
    to,
    children,
    variant = "link",
    target,
    className,
}: LinkProps) {
    const base = "px-4 py-2 rounded font-medium transition cursor-pointer";

    const styles = {
        link: "text-[var(--primary)] hover:underline",
        button: cn(
            base,
            "bg-[var(--primary)] text-[var(--on-primary)] hover:brightness-110",
            "disabled:bg-[var(--disabled)] disabled:text-[var(--on-primary)]"
        ),
    };

    return (
        <RouterLink
            to={to}
            target={target}
            className={cn(styles[variant], className)}
        >
            {children}
        </RouterLink>
    );
}
