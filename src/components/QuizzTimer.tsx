import React from "react";

interface QuizzTimerProps {
  timeLeft: number;
  totalTime: number;
}

const QuizzTimer: React.FC<QuizzTimerProps> = ({ timeLeft, totalTime }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / totalTime) * circumference;

  return (
    <div className="relative w-12 h-12">
      <svg className="w-full h-full rotate-[-90deg]">
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>

      <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
        {Math.ceil(timeLeft)}
      </span>
    </div>
  );
};

export default QuizzTimer;
