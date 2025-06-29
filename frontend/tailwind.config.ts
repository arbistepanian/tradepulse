export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                "on-primary": "var(--on-primary)",
                surface: "var(--surface)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                border: "var(--border)",
                muted: "var(--muted)",
                "text-muted": "var(--text-muted)",
                "text-secondary": "var(--text-secondary)",
                "text-foreground": "var(--text-foreground)",
            },
        },
    },
    plugins: [],
};
