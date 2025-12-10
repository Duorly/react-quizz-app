import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "../assets/Background_animated.mp4";
import BackButton from "../components/BackButton";
import ThemeGrid from "../components/themeGrid";

const ThemeSelection: React.FC = () => {
    const navigate = useNavigate();

    const handleSelectTheme = (id: number | string) => {
        navigate(
            id === "mix"
                ? "/difficulty-selection"
                : `/difficulty-selection?theme=${id}`
        );
    };

    return (
        <div className="w-screen h-screen relative overflow-hidden bg-black">
            <video
                src={backgroundVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-80"
            />

            <BackButton />

            <div className="relative z-10 w-full h-full overflow-y-auto flex flex-col items-center">
                <h1
                    className="text-white drop-shadow-xl text-center mt-20 mb-10"
                    style={{ fontFamily: "'Jomhuria', cursive", fontSize: "120px" }}
                >
                    CHOISISSEZ UNE CATÉGORIE
                </h1>

                <ThemeGrid onSelect={handleSelectTheme} />
            </div>
        </div>
    );
};

export default ThemeSelection;
