import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ClassicQuizzPage from "../pages/classic-quizz-page";
import DifficultySelection from "../pages/difficulty-selection";
import Homepage from "../pages/Homepage";
import QuizzSelection from "../pages/quizz-selection";
import ClassicQuizzResults from "../pages/results-classic-quizz";
import ResultsSuddenDeath from "../pages/results-sudden-death";
import SuddenDeath from "../pages/sudden-death";
import ThemeSelection from "../pages/theme-selection";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/quizz-selection" element={<QuizzSelection />} />
        <Route path="/theme-selection" element={<ThemeSelection />} />
        <Route path="/difficulty-selection" element={<DifficultySelection />} />
        <Route path="/sudden-death" element={<SuddenDeath />} />
        <Route path="/results-sudden-death" element={<ResultsSuddenDeath />} />
        <Route path="/classic-quizz" element={<ClassicQuizzPage />} />
        <Route path="/results-classic" element={<ClassicQuizzResults />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
