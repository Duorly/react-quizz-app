import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "../assets/Background_animated.mp4";
import BackButton from "../components/BackButton";

const categories = [
    { id: 9, name: "CULTURE GENERALE", image: "/themes/cultureG.webp" },
    { id: 23, name: "HISTOIRE", image: "/themes/histoire.webp" },
    { id: 11, name: "FILMS", image: "/themes/films.webp" },
    { id: 21, name: "SPORTS", image: "/themes/KyllianMbappe.webp" },
    { id: 17, name: "SCIENCES & NATURE", image: "/themes/svt.webp" },
    { id: "mix", name: "MIX", image: "/themes/mix.webp" }
];

const ThemeSelection: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Chargement de la police Jomhuria
        const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Jomhuria&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }, []);

    const handleSelectTheme = (id: number | string) => {
        if (id === "mix") {
            navigate(`/difficulty-selection`);
        } else {
            navigate(`/difficulty-selection?theme=${id}`);
        }
    };

    return (
        <div className="w-screen h-screen relative overflow-hidden bg-black">

            {/* Vidéo en arrière-plan (Fixe) */}
            <video
                src={backgroundVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-80"
            />

            {/* BackButton (Absolu par dessus tout, Z-Index élevé) */}
            
                <BackButton />

            {/* Wrapper de contenu défilable (Z-Index 10 pour être au dessus de la vidéo) */}
            <div className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center">

                {/* Section Titre : Marges adaptatives pour éviter le chevauchement avec le bouton retour */}
                <div className="w-full flex justify-center mt-16 sm:mt-12 md:mt-16 lg:mt-20 mb-6 sm:mb-8 px-4">
                    <h1
                        style={{ fontFamily: "'Jomhuria', cursive" }}
                        className="text-white drop-shadow-xl text-center
                                   text-5xl leading-[0.8]
                                   sm:text-6xl sm:leading-[0.8]
                                   md:text-7xl md:leading-[0.9]
                                   lg:text-8xl lg:leading-[1]
                                   xl:text-[130px] xl:leading-[0.8]"
                    >
                        CHOISISSEZ UNE CATÉGORIE
                    </h1>
                </div>

                {/* Section Grille */}
                <div className="w-full max-w-7xl px-4 sm:px-8 md:px-12 lg:px-16 pb-10">
                    <div className="grid grid-cols-2 md:grid-cols-3
                                    gap-3 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
                        {categories.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => handleSelectTheme(c.id)}
                                className="group relative w-full aspect-square rounded-xl overflow-hidden shadow-2xl
                                           transform transition-all duration-300 ease-out
                                           hover:scale-105 active:scale-95 hover:shadow-blue-500/20 border border-white/10"
                            >
                                {/* Image de la catégorie */}
                                <img
                                    src={c.image}
                                    alt={c.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Overlay sombre pour lisibilité */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Titre de la catégorie */}
                                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 text-center">
                                    <span
                                        className="text-white block drop-shadow-md"
                                        style={{
                                            fontFamily: "'Jomhuria', cursive",
                                            textShadow: "2px 2px 4px rgba(0,0,0,1)",
                                            
                                            
                                        }}
                                    >
                                        <span className="block text-3xl leading-10 sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px] tracking-wide">
                                            {c.name}
                                        </span>
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeSelection;