import { Outlet, Link } from "react-router-dom";

export default function Layout() {
    return (
        <main className="min-h-screen bg-background text-text px-4">
            <nav className="bg-surface shadow p-4 mb-6 w-full">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-md font-bold text-text-secondary">
                        📈 TradePulse
                    </h1>
                    <div className="space-x-4">
                        <Link to="/" className="hover:underline text-primary">
                            Home
                        </Link>
                        <Link
                            to="/dashboard"
                            className="hover:underline text-primary">
                            Dashboard
                        </Link>
                    </div>
                </div>
            </nav>
            <section className="container mx-auto pl-4 pr-6 md:px-4">
                <Outlet />
            </section>
        </main>
    );
}
