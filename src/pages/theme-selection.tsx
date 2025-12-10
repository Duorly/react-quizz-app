import React from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import PageTitle from "../components/PageTitle";
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

            {/* Vidéo en arrière-plan (Fixe) */}
                <Background />

            {/* BackButton (Absolu par dessus tout, Z-Index élevé) */}
            
                <BackButton />

            {/* Wrapper de contenu défilable (Z-Index 10 pour être au dessus de la vidéo) */}
            <div className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center">

                {/* Section Titre : Marges adaptatives pour éviter le chevauchement avec le bouton retour */}
                <div className="w-full flex justify-center mt-16 sm:mt-12 md:mt-16 lg:mt-20 mb-6 sm:mb-8 px-4">
                    <PageTitle variant="large">CHOISISSEZ UNE CATÉGORIE</PageTitle>
                </div>

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
