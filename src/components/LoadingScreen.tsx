import React from "react";
import Background from "./Background";
interface LoadingScreenProps {
    message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
    message = "Chargement des questions..."
}) => {
    return (
        <div className="w-full h-[100dvh] relative flex items-center justify-center bg-black overflow-hidden">
            <Background />
            <div
                className="relative z-10 text-white text-4xl animate-pulse font-bold"
                style={{ fontFamily: "'Jomhuria', cursive" }}
            >
                {message}
            </div>
        </div>
    );
};

export default LoadingScreen;
