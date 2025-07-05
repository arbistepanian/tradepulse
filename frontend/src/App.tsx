import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import Layout from "./ui/Layout";
import ReactGA from "react-ga4";
import { useEffect } from "react";

const trackingId = import.meta.env.VITE_GA_ID;
ReactGA.initialize(trackingId);

function App() {
    useEffect(() => {
        ReactGA.send("pageview");
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
