// src/pages/LandingPage.tsx
import { useNavigate } from "react-router-dom";

export default function home() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/quiz-type")}
      className="
        w-screen h-screen cursor-pointer
        flex items-center justify-center
        bg-gradient-animation
      "
    >
      <h1
        className="
          text-white text-5xl md:text-7xl font-bold
          animate-title-pulse select-none
        "
      >
        Clique pour commencer
      </h1>
    </div>
  );
}
