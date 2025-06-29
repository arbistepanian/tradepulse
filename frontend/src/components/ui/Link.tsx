import { Link as RouterLink } from "react-router-dom";
import type { ReactNode } from "react";

interface LinkProps {
    to: string;
    children: ReactNode;
}

export default function Link({ to, children }: LinkProps) {
    return (
        <RouterLink to={to} className="text-[var(--primary)] hover:underline">
            {children}
        </RouterLink>
    );
}
