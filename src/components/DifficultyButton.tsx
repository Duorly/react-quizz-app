import React from "react";

interface DifficultyButtonProps {
  label: string;
  color: string;
  onClick: () => void;
}

const DifficultyButton: React.FC<DifficultyButtonProps> = ({
  label,
  color,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full sm:flex-1
        h-20 sm:h-24 md:h-28 lg:h-30 xl:h-30
        rounded-lg font-bold text-white drop-shadow-xl
        hover:scale-105 active:scale-95 transition-transform"
      style={{
        backgroundColor: color,
        fontFamily: "'Jomhuria', cursive",
        textShadow: "2px 2px 4px rgba(0,0,0,0.9)",
        boxShadow: "0px 6px 14px rgba(0,0,0,0.5)",
      }}
    >
      <span
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px]"
        style={{ letterSpacing: "2px" }}
      >
        {label}
      </span>
    </button>
  );
};

export default DifficultyButton;
