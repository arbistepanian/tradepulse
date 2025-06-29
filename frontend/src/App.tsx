import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import Layout from "./components/Layout";

function App() {
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
