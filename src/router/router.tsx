import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DifficultySelection from "../pages/difficulty-selection";
import Homepage from "../pages/Homepage";
import QuizzSelection from "../pages/quizz-selection";
import ResultsSuddenDeath from "../pages/results-sudden-death";
import SuddenDeath from "../pages/sudden-death";
import ThemeSelection from "../pages/theme-selection";
import ClassicQuizzPage from "../pages/classic-quizz-page";
import CountdownPage from "../pages/CountdownPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/quizz-selection" element={<QuizzSelection />} />
        <Route path="/theme-selection" element={<ThemeSelection />} />
        <Route path="/difficulty-selection" element={<DifficultySelection />} />
        <Route path="/sudden-death" element={<SuddenDeath />} />
        <Route path="/results" element={<ResultsSuddenDeath />} />
        <Route path="/classic-quizz" element={<ClassicQuizzPage />} />
        <Route path="/countdown" element={<CountdownPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
