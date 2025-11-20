import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

.pulse-letters {
  animation: pulseText 2.5s infinite ease-in-out;
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

        <div className="absolute inset-0" />

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center">
          <img
            src="/BrainBurstLogo.png"
            alt="BrainBurst Logo"
            className="w-64 -mt-42 -mb-10 drop-shadow-lg filter invert brightness-0"
          />

          <h1
            style={{
              fontFamily: "'Jomhuria', cursive",
              fontSize: "153px",
              lineHeight: "99px",
            }}
            className="text-white drop-shadow-xl pulse-letters"
          >
            CLIQUEZ POUR
            <br />
            COMMENCER !
          </h1>
        </div>
      </div>
    </>
  );
};

export default Homepage;
