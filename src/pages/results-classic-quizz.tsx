import React from "react";
import { useSearchParams } from "react-router-dom";
import backgroundVideo from "../assets/Background_animated.mp4";

import ResultButtons from "../components/result/ResultButtons";
import ResultTitle from "../components/result/ResultTitle";

const ClassicQuizzResults: React.FC = () => {
  const [params] = useSearchParams();

  const score = Number(params.get("score")) || 0;
  const total = Number(params.get("total")) || 20;

  const getMessage = () => {
    const ratio = score / total;

    if (ratio === 1) return "Parfait, incroyable !";
    if (ratio >= 0.8) return "Presque parfait, essayez encore !";
    if (ratio >= 0.5) return "Pas mal, continuez !";
    return "Essayez encore, vous pouvez le faire !";
  };

  return (
    <div className="w-screen h-screen relative flex flex-col items-center justify-center text-center">
      {/* BACKGROUND VIDEO */}
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/10" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center px-6 mt-10">
        <ResultTitle text="Résultats" />

        {/* SUBTEXT */}
        <p
          className="text-white drop-shadow-lg mt-4"
          style={{
            fontFamily: "'Jomhuria', cursive",
            fontSize: "70px",
          }}
        >
          Vous avez obtenu le résultat de :
        </p>

        {/* SCORE */}
        <p
          className="mt-6 drop-shadow-xl"
          style={{
            fontFamily: "'Jomhuria', cursive",
            fontSize: "200px",
            color: "#9AF76A",
          }}
        >
          {score}/{total}
        </p>

        {/* MESSAGE */}
        <p
          className="text-white drop-shadow-lg mt-6"
          style={{
            fontFamily: "'Jomhuria', cursive",
            fontSize: "60px",
          }}
        >
          {getMessage()}
        </p>

        <ResultButtons replayPath="/theme-selection" />
      </div>
    </div>
  );
};

export default ClassicQuizzResults;
