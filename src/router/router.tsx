import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import QuizzSelection from "../pages/quizz-selection";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/quizz-selection" element={<QuizzSelection />} />
      </Routes>
    </BrowserRouter>
  );
}
