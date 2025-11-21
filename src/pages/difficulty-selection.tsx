import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import backgroundVideo from "../assets/Background_animated.mp4";
import BackButton from "../components/BackButton";

const difficulties = [
  { level: "easy", label: "EASY", color: "#9CFF7E" },
  { level: "medium", label: "MEDIUM", color: "#FFBD7B" },
  { level: "hard", label: "EXPERT", color: "#DB5D5D" },
];

const DifficultySelection: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const theme = params.get("theme");

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Jomhuria&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

    const handleDifficulty = (level: string) => {
        const queryTheme = theme && theme !== "null" ? `theme=${theme}&` : "";
        navigate(`/countdown?${queryTheme}difficulty=${level}&seconds=3`);

    };

    return (
        <div className="w-screen h-screen relative overflow-hidden">
            <video
                src={backgroundVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />

            <BackButton />

            <div className="absolute top-6 sm:top-12 md:top-20 lg:top-32 xl:top-40 left-0 right-0 flex justify-center z-10 px-4">
                <h1
                    style={{
                        fontFamily: "'Jomhuria', cursive",
                    }}
                    className="text-white drop-shadow-xl text-center
                     text-3xl leading-7
                     sm:text-4xl sm:leading-9
                     md:text-5xl md:leading-[2.5rem]
                     lg:text-6xl lg:leading-[3rem]
                     xl:text-[140px] xl:leading-[70px]"
                >
                    CHOISISSEZ UNE DIFFICULTÉ
                </h1>
            </div>

            <div className="relative z-10 w-full h-full flex items-center justify-center px-4 pt-20 sm:pt-24 md:pt-28">
                <div className="flex flex-col sm:flex-row
                        gap-4 sm:gap-6 md:gap-10 lg:gap-16 xl:gap-20
                        w-full max-w-6xl">
                    {difficulties.map((d) => (
                        <button
                            key={d.level}
                            onClick={() => handleDifficulty(d.level)}
                            className="w-full sm:flex-1
                         h-20 sm:h-24 md:h-28 lg:h-30 xl:h-30
                         rounded-lg font-bold text-white drop-shadow-xl
                         hover:scale-105 active:scale-95 transition-transform"
                            style={{
                                backgroundColor: d.color,
                                fontFamily: "'Jomhuria', cursive",
                                textShadow: "2px 2px 4px rgba(0,0,0,0.9)",
                                boxShadow: "0px 6px 14px rgba(0,0,0,0.5)",
                            }}
                        >
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px]"
                    style={{ letterSpacing: "2px" }}>
                {d.label}
              </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DifficultySelection;
