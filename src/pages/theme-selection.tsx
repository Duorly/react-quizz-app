import React from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ThemeGrid from "../components/ThemeGrid";
import Background from "../components/Background";

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

            <Background />

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
