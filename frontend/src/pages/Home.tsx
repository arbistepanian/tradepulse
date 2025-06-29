export default function HomePage() {
  return (
    <section className="bg-background text-foreground py-20">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Welcome to TradePulse 📊
        </h1>
        <p className="text-lg text-muted mb-8">
          Your one-stop dashboard for market insights, price trends, and stock
          sentiment. Powered by real-time data and smart indicators, TradePulse
          helps you stay ahead in the market.
        </p>
        <a
          href="/dashboard"
          className="inline-block bg-primary text-on-primary font-semibold px-6 py-3 rounded hover:bg-accent transition"
        >
          Go to Dashboard
        </a>
      </div>
    </section>
  );
}
