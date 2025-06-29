import Heading from "../components/ui/Heading";
import Link from "../components/ui/Link";

export default function HomePage() {
    return (
        <section className="w-full max-w-3xl mx-auto bg-[var(--background)] text-[var(--foreground) py-10 sm:py-20">
            <div className="flex flex-col justify-center items-center gap-4">
                <img
                    src="/home-page-hero.jpg"
                    width={1000}
                    height={560}
                    alt="Portura Lite"
                    className="h-auto rounded-lg shadow-lg mb-6"
                />
                <Heading level={1}>Welcome to TradePulse 📊</Heading>
                <p className="text-lg text-[var(--foreground) mb-8 text-center">
                    Your one-stop dashboard for market insights, price trends,
                    and stock news. Powered by real-time data and smart
                    indicators, TradePulse helps you stay ahead in the market.
                </p>
                <Link variant="button" to="/dashboard">
                    Go to Dashboard
                </Link>
                <p className="text-lg text-[var(--foreground) mb-8">
                    <span>Made By </span>
                    <Link to="https://github.com/arbistepanian" target="_blank">
                        Arbi Stepanian
                    </Link>
                </p>
            </div>
        </section>
    );
}
