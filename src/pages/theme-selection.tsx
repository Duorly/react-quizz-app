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

            <Background />

            <BackButton />

            <div className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center">

                <div className="w-full flex justify-center mt-20 mb-10 px-4">
                    <PageTitle variant="large">
                        CHOISISSEZ UNE CATÉGORIE
                    </PageTitle>
                </div>

                <ThemeGrid onSelect={handleSelectTheme} />
            </div>
        </div>
    );
};

export default ThemeSelection;
