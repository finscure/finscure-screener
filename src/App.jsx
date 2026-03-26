import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TradingProvider } from "./contexts/TradingContext";
import Navbar from "./components/Navbar";
import ScreenerPage from "./pages/ScreenerPage";
import LearnPage from "./pages/LearnPage";
import CoursePage from "./pages/CoursePage";
import TradePage from "./pages/TradePage";
import OrderPage from "./pages/OrderPage";
import LeaderboardPage from "./pages/LeaderboardPage";

export default function App() {
  return (
    <AuthProvider>
      <TradingProvider>
        <BrowserRouter>
          <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#f8f7fc" }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<ScreenerPage />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/learn/:courseId" element={<CoursePage />} />
              <Route path="/trade" element={<TradePage />} />
              <Route path="/trade/order/:symbol/:action" element={<OrderPage />} />
              <Route path="/trade/leaderboard" element={<LeaderboardPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TradingProvider>
    </AuthProvider>
  );
}
