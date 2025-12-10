import React from "react";

interface Props {
    id: number | string;
    name: string;
    image: string;
    onSelect: (id: number | string) => void;
}

const ThemeCard: React.FC<Props> = ({ id, name, image, onSelect }) => {
    return (
        <button
            onClick={() => onSelect(id)}
            className="group relative w-full aspect-square rounded-xl overflow-hidden shadow-2xl
                 transform transition-all duration-300 ease-out
                 hover:scale-105 active:scale-95 hover:shadow-blue-500/20 border border-white/10"
        >
            <img
                src={image}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <span
                    className="text-white drop-shadow-md block"
                    style={{
                        fontFamily: "'Jomhuria', cursive",
                        textShadow: "2px 2px 4px rgba(0,0,0,1)"
                    }}
                >
                    <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-[70px] tracking-wide">
                        {name}
                    </span>
                </span>
            </div>
        </button>
    );
};

export default ThemeCard;
