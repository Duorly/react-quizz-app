import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import QuizzSelection from "../pages/quizz-selection";
import ThemeSelection from "../pages/theme-selection";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/quizz-selection" element={<QuizzSelection />} />
        <Route path="/theme-selection" element={<ThemeSelection />} />

      </Routes>
    </BrowserRouter>
  );
}
