import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import backgroundVideo from "../assets/Background_animated.mp4";

const Homepage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Jomhuria&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }, []);

    const handleClick = () => {
        navigate("/quizz-selection");
    };

    return (
        <>
            <style>{`
                @keyframes pulseText {
                  0%, 100% {
                    transform: scale(1);
                    letter-spacing: 2px;
                    opacity: 0.5;
                  }
                  50% {
                    transform: scale(1.05);
                    letter-spacing: 10px;
                    opacity: 1;
                  }
                }
                
                @keyframes pulseTextMobile {
                  0%, 100% {
                    transform: scale(1);
                    letter-spacing: 1px;
                    opacity: 0.5;
                  }
                  50% {
                    transform: scale(1.05);
                    letter-spacing: 3px;
                    opacity: 1;
                  }
                }
                
                .pulse-letters {
                  animation: pulseText 2.5s infinite ease-in-out;
                }
                
                @media (max-width: 768px) {
                  .pulse-letters {
                    animation: pulseTextMobile 2.5s infinite ease-in-out;
                  }
                }
            `}</style>

            <div
                className="w-screen h-screen overflow-hidden cursor-pointer relative"
                onClick={handleClick}
            >
                <video
                    src={backgroundVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0"/>

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
                    <img
                        src="/BrainBurstLogo.png"
                        alt="BrainBurst Logo"
                        className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 mb-4 sm:mb-6 md:mb-8 lg:mb-10 drop-shadow-lg filter invert brightness-0"
                    />

                    <h1
                        style={{
                            fontFamily: "'Jomhuria', cursive",
                        }}
                        className="text-white drop-shadow-xl pulse-letters
                                   text-5xl leading-10
                                   sm:text-6xl sm:leading-[3rem]
                                   md:text-7xl md:leading-[4rem]
                                   lg:text-8xl lg:leading-[5rem]
                                   xl:text-[153px] xl:leading-[99px]"
                    >
                        CLIQUEZ POUR
                        <br/>
                        COMMENCER !
                    </h1>
                </div>
            </div>
        </>
    );
};

export default Homepage;