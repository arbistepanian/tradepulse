import Heading from "../ui/components/Heading";
import Link from "../ui/components/Link";

export default function HomePage() {
    return (
        <>
            <title>TradePulse – Smarter Stock Insights</title>
            <meta
                name="description"
                content="Get mini price charts, key company facts, and trending financial news at a glance with TradePulse."
            />
            <meta property="og:title" content="TradePulse" />
            <meta
                property="og:description"
                content="Smarter stock insights with charts, company data, and trending news tags."
            />
            <meta
                property="og:image"
                content="https://tradepulse-lite.vercel.app/home-page-hero.jpg"
            />
            <meta
                property="og:url"
                content="https://tradepulse-lite.vercel.app"
            />
            <meta name="twitter:card" content="summary_large_image" />
            <section className="w-full max-w-3xl mx-auto bg-[var(--background)] text-[var(--foreground) pt-6">
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
                        Your one-stop dashboard for market insights, price
                        trends, and stock news. Powered by real-time data and
                        smart indicators, TradePulse helps you stay ahead in the
                        market.
                    </p>
                    <Link variant="button" to="/dashboard">
                        Go to Dashboard
                    </Link>
                    <p className="text-lg text-[var(--foreground) mb-8">
                        <span>Made By </span>
                        <Link
                            to="https://github.com/arbistepanian"
                            target="_blank">
                            Arbi Stepanian
                        </Link>
                    </p>
                </div>
            </section>
        </>
    );
}
