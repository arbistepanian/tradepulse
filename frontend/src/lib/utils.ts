import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getCSSVar(name: string) {
    return (
        getComputedStyle(document.documentElement).getPropertyValue(name) ||
        "#222"
    );
}
