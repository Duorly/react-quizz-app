import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "../assets/Background_animated.mp4";

const QuizzSelection: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Jomhuria&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="w-screen h-screen relative">
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" />

      <div className="absolute top-40 left-0 right-0 flex justify-center z-10">
        <h1
          style={{
            fontFamily: "'Jomhuria', cursive",
            fontSize: "140px",
            lineHeight: "70px",
          }}
          className="text-white drop-shadow-xl"
        >
          CHOISISSEZ VOTRE QUIZZ
        </h1>
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="flex flex-row gap-100 mt-20">
          <button
            onClick={() => navigate("/theme-selection")}
            className="px-38 py-6 bg-gray-200 text-black text-4xl rounded shadow-lg hover:scale-105 transition-transform"
            style={{
              fontFamily: "'Jomhuria', cursive",
              fontSize: "80px",
            }}
          >
            CLASSIQUE
          </button>

          <button
            onClick={() => navigate("/countdown?mode=sudden-death")}
            className="px-38 py-6 bg-black text-white text-4xl rounded shadow-lg hover:scale-105 transition-transform"
            style={{
              fontFamily: "'Jomhuria', cursive",
              fontSize: "80px",
            }}
          >
            MORT SUBITE
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizzSelection;
