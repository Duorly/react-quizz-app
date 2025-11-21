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
        <div className="w-screen h-screen relative overflow-hidden">
            <video
                src={backgroundVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" />

            <div className="absolute top-8 sm:top-16 md:top-24 lg:top-32 xl:top-40 left-0 right-0 flex justify-center z-10 px-4">
                <h1
                    style={{
                        fontFamily: "'Jomhuria', cursive",
                    }}
                    className="text-white drop-shadow-xl text-center
                     text-4xl leading-8
                     sm:text-5xl sm:leading-10
                     md:text-6xl md:leading-[3rem]
                     lg:text-7xl lg:leading-[3.5rem]
                     xl:text-[140px] xl:leading-[70px]"
                >
                    CHOISISSEZ VOTRE QUIZZ
                </h1>
            </div>

            <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-24 mt-12 sm:mt-16 md:mt-20 w-full max-w-6xl">
                    <button
                        onClick={() => navigate("/theme-selection")}
                        className="w-full sm:w-auto flex-1 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-32
                       py-4 sm:py-5 md:py-6
                       bg-gray-200 text-black rounded shadow-lg
                       hover:scale-105 active:scale-95 transition-transform
                       text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[80px]"
                        style={{
                            fontFamily: "'Jomhuria', cursive",
                        }}
                    >
                        CLASSIQUE
                    </button>

                    <button
                        onClick={() => navigate("/countdown?mode=sudden-death")}
                        className="w-full sm:w-auto flex-1 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-32
                       py-4 sm:py-5 md:py-6
                       bg-black text-white rounded shadow-lg
                       hover:scale-105 active:scale-95 transition-transform
                       text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[80px]"
                        style={{
                            fontFamily: "'Jomhuria', cursive",
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