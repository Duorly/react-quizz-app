import {useNavigate} from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Background from "../components/Background";

const Homepage: React.FC = () => {
    const navigate = useNavigate();

   

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

          <div className="w-screen h-screen relative" onClick={handleClick}>
            <Background />

                <div className="absolute inset-0"/>

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
                    <img
                        src="/BrainBurstLogo.png"
                        alt="BrainBurst Logo"
                        className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 mb-4 sm:mb-6 md:mb-8 lg:mb-10 drop-shadow-lg filter invert brightness-0"
                    />

                    <PageTitle variant="large" className="pulse-letters">
                        CLIQUEZ POUR
                        <br/>
                        COMMENCER !
                    </PageTitle>
                </div>
            </div>
        </>
    );
};

export default Homepage;