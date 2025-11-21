import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import backgroundVideo from "../assets/Background_animated.mp4";

import ResultButtons from "../components/result/ResultButtons";
import ResultScore from "../components/result/ResultScore";
import ResultTitle from "../components/result/ResultTitle";

const ResultsSuddenDeath: React.FC = () => {
  const [params] = useSearchParams();
  const score = Number(params.get("score")) || 0;

  const [record, setRecord] = useState(0);

  useEffect(() => {
    const best = Number(localStorage.getItem("bestSuddenDeath") || "0");
    if (score > best) {
      localStorage.setItem("bestSuddenDeath", String(score));
      setRecord(score);
    } else {
      setRecord(best);
    }
  }, [score]);

  const getMessage = () => {
    if (score === record && score !== 0)
      return "C'est un nouveau record bravo !";
    if (score < 10) return "Allez, tu peux faire mieux !";
    if (score < 20) return "Pas mal du tout !";
    if (score < 40) return "C'est un très bon score !";
    return "Incroyable performance !";
  };

  return (
    <div className="w-screen h-screen relative flex flex-col items-center justify-center text-center">
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 flex flex-col items-center px-6 mt-10">
        <ResultTitle text="MORT SUBITE" />

        <p
          className="text-white drop-shadow-lg mt-4"
          style={{
            fontFamily: "'Jomhuria', cursive",
            fontSize: "70px",
          }}
        >
          Voici le nombre de points que vous avez obtenu :
        </p>

        <ResultScore score={score} record={record} message={getMessage()} />

        <ResultButtons />
      </div>
    </div>
  );
};

export default ResultsSuddenDeath;
