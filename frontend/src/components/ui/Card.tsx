import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
}

export default function Card({ children }: CardProps) {
    return (
        <div className="bg-[var(--surface)] rounded shadow p-4 border border-border">
            {children}
        </div>
    );
}
