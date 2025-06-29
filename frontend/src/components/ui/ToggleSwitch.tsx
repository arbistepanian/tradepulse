type ToggleSwitchProps = {
    id: string;
    label?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
};

export default function ToggleSwitch({
    id,
    label,
    checked,
    onChange,
    disabled = false,
}: ToggleSwitchProps) {
    return (
        <div className="flex items-center gap-2">
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-[var(--foreground)]"
                >
                    {label}
                </label>
            )}

            <button
                id={id}
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2
                    ${checked ? "bg-[var(--primary)]" : "bg-[var(--muted)]"}
                    ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-[var(--background)] transition-transform duration-300
                        ${checked ? "translate-x-5" : "translate-x-1"}`}
                />
            </button>
        </div>
    );
}
