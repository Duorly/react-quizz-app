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
        // Récupération et mise à jour du record local
        const best = Number(localStorage.getItem("bestSuddenDeath") || "0");
        if (score > best) {
            localStorage.setItem("bestSuddenDeath", String(score));
            setRecord(score);
        } else {
            setRecord(best);
        }
    }, [score]);

    const getMessage = () => {
        // Si c'est un record et que le score n'est pas 0
        if (score > Number(localStorage.getItem("bestSuddenDeath") || "0") && score !== 0) {
            return "C'est un nouveau record bravo !";
        }
        // Note: La logique ci-dessus peut être simplifiée selon tes besoins,
        // car le useEffect met déjà à jour le localStorage avant l'affichage parfois.
        // Voici une logique basée sur le score brut :

        if (score === record && score !== 0) return "C'est un nouveau record bravo !";
        if (score < 10) return "Allez, tu peux faire mieux !";
        if (score < 20) return "Pas mal du tout !";
        if (score < 40) return "C'est un très bon score !";
        return "Incroyable performance !";
    };

    return (
        // Container Principal : Fixe la vue à l'écran, arrière-plan noir
        <div className="w-full h-[100dvh] relative bg-black overflow-hidden">

            {/* Vidéo d'arrière-plan (Fixe, ne scrolle pas) */}
            <video
                src={backgroundVideo}
                autoPlay
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay sombre pour améliorer la lisibilité */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Wrapper de contenu SCROLLABLE (Z-Index par dessus la vidéo) */}
            <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden">

                {/* Flex Container : Centre le contenu verticalement si possible,
            mais s'étend (min-h-full) si le contenu est trop grand */}
                <div className="min-h-full flex flex-col items-center justify-center py-10 px-4 text-center">

                    <ResultTitle text="MORT SUBITE" />

                    {/* Phrase d'intro : Taille adaptative */}
                    <p
                        className="text-white drop-shadow-lg mt-4 mb-2
                       text-3xl sm:text-5xl md:text-6xl lg:text-[70px]
                       leading-tight max-w-4xl mx-auto"
                        style={{ fontFamily: "'Jomhuria', cursive" }}
                    >
                        Voici le nombre de points que vous avez obtenu :
                    </p>

                    {/* Le composant Score (Score + Record + Message) */}
                    <div className="w-full flex justify-center my-4">
                        <ResultScore score={score} record={record} message={getMessage()} />
                    </div>

                    {/* Boutons d'action (Rejouer / Accueil) */}
                    <div className="mt-6 pb-8">
                        <ResultButtons replayPath="/sudden-death" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ResultsSuddenDeath;