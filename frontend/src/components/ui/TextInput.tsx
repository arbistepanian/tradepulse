import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import Label from "./Label";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function TextInput({
    label,
    id,
    className,
    ...props
}: TextInputProps) {
    return (
        <div className="flex w-full flex-col justify-start gap-2">
            {label && (
                <Label htmlFor={id} className="mb-1">
                    {label}
                </Label>
            )}
            <input
                id={id}
                {...props}
                className={cn(
                    "w-full px-4 py-2 h-10 rounded border focus:outline-none focus:ring-2",
                    "bg-[var(--background)] text-[var(--foreground)] placeholder-muted border-[var(--border)] focus:ring-[var(--primary)]",
                    className
                )}
            />
        </div>
    );
}
