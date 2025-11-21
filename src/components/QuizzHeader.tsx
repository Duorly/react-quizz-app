import React from "react";
import QuizTimer from "./QuizzTimer";

interface HeaderProps {
  category: string;
  questionNumber: number;
  timeLeft: number;
  totalTime: number;
}

const QuizzHeader: React.FC<HeaderProps> = ({
  category,
  questionNumber,
  timeLeft,
  totalTime,
}) => {
  return (
    <div className="relative z-10 w-full flex justify-between items-center px-6">
      <QuizTimer timeLeft={timeLeft} totalTime={totalTime} />

      <div
        className="text-white drop-shadow-lg"
        style={{ fontFamily: "'Jomhuria', cursive", fontSize: "100px" }}
      >
        {category.toUpperCase()}
      </div>

      <div className="text-white text-5xl font-bold">{questionNumber}</div>
    </div>
  );
};

export default QuizzHeader;
