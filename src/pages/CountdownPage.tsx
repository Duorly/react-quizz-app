
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import backgroundVideo from "../assets/Background_animated.mp4";


const CountdownPage: React.FC = () => {

  const [searchParams] = useSearchParams();
  const seconds = Number(searchParams.get('seconds')) || 3;
  const theme = searchParams.get('theme');
  const difficulty = searchParams.get('difficulty');
  const mode = searchParams.get('mode');
  const [timeLeft, setTimeLeft] = useState(seconds);
  const navigate = useNavigate();

  useEffect(() => {

    if (!document.getElementById('jomhuria-font')) {
      const link = document.createElement('link');
      link.id = 'jomhuria-font';
      link.href = 'https://fonts.googleapis.com/css2?family=Jomhuria&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    if (timeLeft <= 0) {
      if (mode === 'sudden-death') {
        navigate('/sudden-death');
      } else {
        const queryTheme = theme && theme !== "null" ? `theme=${theme}&` : "";
        navigate(`/classic-quizz?${queryTheme}difficulty=${difficulty}`);
      }
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate, theme, difficulty, mode]);

  return (
    <div>
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="absolute top-40 left-0 right-0 flex justify-center z-10">
          <h1
            style={{
              fontFamily: "'Jomhuria', cursive",
              fontSize: "140px",
              lineHeight: "70px",
            }}
            className="text-white drop-shadow-xl"
          >
            VOTRE QUIZZ VA DEBUTER ...
          </h1>
        </div>
        <div style={{
          fontFamily: "'Jomhuria', cursive",
          fontSize: "153px",
          lineHeight: "99px",
          margin: '2rem',
        }}
          className="text-white drop-shadow-xl">
          {timeLeft}
        </div>
      </div>
    </div>
  );
};

export default CountdownPage;
