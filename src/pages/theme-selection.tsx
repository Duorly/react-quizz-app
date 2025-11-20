import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "../assets/Background_animated.mp4";
import BackButton from "../components/BackButton";

const categories = [
    {
        id: 11, name: "CULTURE GENERALE", image: "/themes/cultureG.webp"
    },
    {
        id: 12, name: "HISTOIRE", image: "/themes/histoire.webp"
    },
    {
        id: 13, name: "FILMS", image: "/themes/films.webp"
    },
    {
        id: 14, name: "SPORTS", image: "/themes/KyllianMbappe.webp"
    },
    {
        id: 15, name: "SCIENCES & NATURE", image: "/themes/svt.webp"
    },
    {
        id: 16, name: "MIX", image: "/themes/mix.webp"
    }
];

const ThemeSelection: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const link = document.createElement("link");
        link.href =
            "https://fonts.googleapis.com/css2?family=Jomhuria&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }, []);

    const handleSelectTheme = (id: number) => {
        navigate(`/difficulty-selection?theme=${id}`);
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

            <div className="absolute inset-0" />

            <div className="absolute top-40 left-0 right-0 flex justify-center z-10">
                <h1
                    style={{
                        fontFamily: "'Jomhuria', cursive",
                        fontSize: "140px",
                        lineHeight: "70px",
                    }}
                    className="text-white drop-shadow-xl"
                >
                    CHOISISSEZ UNE CATÉGORIE
                </h1>
            </div>
           <BackButton />

            <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="grid grid-cols-3 gap-20 px-20 mt-30">
                    {categories.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => handleSelectTheme(c.id)}
                            className="relative w-95 h-95 rounded overflow-hidden shadow-lg hover:scale-105 transition-transform shadow-gray-800 opacity-90 hover:opacity-100"
                        >
                            <img
                                src={c.image}
                                alt={c.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/40" />

                            <div className="absolute bottom-5 w-full text-center">
                                <span
                                    className="text-white text-4xl drop-shadow-lg"
                                    style={{
                                        fontFamily: "'Jomhuria', cursive",
                                        fontSize: "70px",
                                        lineHeight: "40px",
                                        letterSpacing: "4px",
                                        textShadow: "4px 4px 8px rgba(0,0,0,0.9)"

                                    }}
                                >
                                    {c.name}
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
