import React from "react";
import backgroundVideo from "../assets/Background_animated.mp4";

interface LoadingScreenProps {
    message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
    message = "Chargement des questions..."
}) => {
    return (
        <div className="w-full h-[100dvh] relative flex items-center justify-center bg-black overflow-hidden">
            <video
                src={backgroundVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
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
