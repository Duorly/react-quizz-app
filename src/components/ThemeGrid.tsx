import React from "react";
import ThemeCard from "./themeCard";
import { categories } from "../data/theme-data";

interface Props {
    onSelect: (id: number | string) => void;
}

const ThemeGrid: React.FC<Props> = ({ onSelect }) => {
    return (
        <div className="w-full max-w-7xl px-4 sm:px-8 md:px-12 lg:px-16 pb-10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                {categories.map((c) => (
                    <ThemeCard
                        key={c.id}
                        id={c.id}
                        name={c.name}
                        image={c.image}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </div>
    );
};

export default ThemeGrid;
