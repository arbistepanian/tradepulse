"use client";

import { type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

export default function Button({
    variant = "primary",
    className,
    disabled,
    ...props
}: ButtonProps) {
    const base =
        "px-4 py-2 rounded font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const styles = {
        primary: cn(
            "bg-[var(--primary)] text-[var(--on-primary)] hover:brightness-110",
            "disabled:bg-[var(--disabled)] disabled:text-[var(--on-primary)]"
        ),
        secondary: cn(
            "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--muted)] hover:bg-[var(--hover-surface)]",
            "disabled:bg-[var(--disabled)] disabled:text-[var(--on-primary)]"
        ),
    };

    return (
        <button
            {...props}
            disabled={disabled}
            className={cn(base, styles[variant], className)}
        />
    );
}
