import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import ScreenerPage from "./pages/ScreenerPage";
import LearnPage from "./pages/LearnPage";
import CoursePage from "./pages/CoursePage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#f8f7fc" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<ScreenerPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/:courseId" element={<CoursePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
