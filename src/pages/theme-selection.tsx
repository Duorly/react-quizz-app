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
                    CHOISISSEZ UNE CATÉGORIE
                </h1>
            </div>

            <BackButton />

            <div className="relative z-10 w-full h-full flex items-center justify-center pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3
                        gap-3 sm:gap-4 md:gap-6 lg:gap-12 xl:gap-20
                        px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20
                        w-full max-w-7xl">
                    {categories.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => handleSelectTheme(c.id)}
                            className="relative
                         w-full aspect-square
                         sm:w-full sm:aspect-square
                         md:w-full md:aspect-square
                         lg:w-full lg:aspect-square
                         xl:w-95 xl:h-95
                         rounded overflow-hidden shadow-lg
                         hover:scale-105 active:scale-95 transition-transform
                         shadow-gray-800 opacity-90 hover:opacity-100"
                        >
                            <img
                                src={c.image}
                                alt={c.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/40" />

                            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-5 w-full text-center px-2">
                <span
                    className="text-white drop-shadow-lg block"
                    style={{
                        fontFamily: "'Jomhuria', cursive",
                        textShadow: "4px 4px 8px rgba(0,0,0,0.9)"
                    }}
                >
                  <span className="text-2xl leading-5 sm:text-3xl sm:leading-6 md:text-4xl md:leading-7 lg:text-5xl lg:leading-9 xl:text-[70px] xl:leading-[40px]"
                        style={{ letterSpacing: "1px" }}>
                    {c.name}
                  </span>
                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThemeSelection;