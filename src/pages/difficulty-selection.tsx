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
        link.href =
            "https://fonts.googleapis.com/css2?family=Jomhuria&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }, []);

    const handleDifficulty = (level: string) => {
        navigate(`/quiz?theme=${theme}&difficulty=${level}`);
    };

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

            <div className="absolute inset-0 bg-black/20" />

            <BackButton />

            <div className="absolute top-40 left-0 right-0 flex justify-center z-10">
                <h1
                    style={{
                        fontFamily: "'Jomhuria', cursive",
                        fontSize: "140px",
                        lineHeight: "70px",
                    }}
                    className="text-white drop-shadow-xl"
                >
                    CHOISISSEZ UNE DIFFICULTÉ
                </h1>
            </div>

            <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="flex gap-50 mt-10">
                    {difficulties.map((d) => (
                        <button
                            key={d.level}
                            onClick={() => handleDifficulty(d.level)}
                            className="w-120 h-30 rounded-lg font-bold text-white drop-shadow-xl hover:scale-105 transition-transform"
                            style={{
                                backgroundColor: d.color,
                                fontFamily: "'Jomhuria', cursive",
                                fontSize: "70px",
                                letterSpacing: "4px",
                                textShadow: "2px 2px 4px rgba(0,0,0,0.9)",
                                boxShadow: "0px 6px 14px rgba(0,0,0,0.5)",
                            }}
                        >
                            {d.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DifficultySelection;
