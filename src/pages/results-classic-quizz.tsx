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
        // Container principal fixe (viewport height)
        <div className="w-full h-[100dvh] relative bg-black overflow-hidden">

            {/* BACKGROUND VIDEO (Reste fixe) */}
            <video
                src={backgroundVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />

            {/* ZONE DE CONTENU SCROLLABLE
          C'est ici que la magie opère : si le contenu dépasse, on peut scroller
      */}
            <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden">

                {/* Flex container : min-h-full assure le centrage vertical si possible,
            mais permet l'extension si nécessaire */}
                <div className="min-h-full flex flex-col items-center justify-center py-10 px-4 text-center">

                    <ResultTitle text="Résultats" />

                    {/* SOUS-TITRE : Taille adaptative (Mobile -> Tablette -> Desktop) */}
                    <p
                        className="text-white drop-shadow-lg mt-4 sm:mt-6
                       text-4xl sm:text-5xl md:text-6xl lg:text-[70px]
                       leading-tight"
                        style={{ fontFamily: "'Jomhuria', cursive" }}
                    >
                        Vous avez obtenu le résultat de :
                    </p>

                    {/* SCORE : Taille adaptative massive */}
                    <p
                        className="drop-shadow-xl my-2
                       text-8xl sm:text-9xl md:text-[150px] lg:text-[200px]
                       leading-none"
                        style={{
                            fontFamily: "'Jomhuria', cursive",
                            color: "#9AF76A",
                        }}
                    >
                        {score}/{total}
                    </p>

                    {/* MESSAGE : Taille adaptative */}
                    <p
                        className="text-white drop-shadow-lg mb-8 sm:mb-10
                       text-3xl sm:text-4xl md:text-5xl lg:text-[60px]
                       leading-tight max-w-4xl"
                        style={{ fontFamily: "'Jomhuria', cursive" }}
                    >
                        {getMessage()}
                    </p>

                    <div className="pb-8">
                        <ResultButtons replayPath="/theme-selection" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ClassicQuizzResults;