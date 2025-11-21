import React from "react";

interface QuizzQuestionProps {
  text: string;
}

const QuizzQuestion: React.FC<QuizzQuestionProps> = ({ text }) => {
  return (
    <div
      className="relative z-10 mt-16 text-center max-w-4xl mx-auto flex items-center justify-center px-6"
      style={{
        height: "220px", // hauteur fixe = 2 lignes
      }}
    >
      <p
        className="text-white drop-shadow-lg"
        style={{
          fontFamily: "'Jomhuria', cursive",
          fontSize: "85px",
          lineHeight: "75px",
          display: "inline-block",
          maxHeight: "150px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          wordBreak: "break-word",
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default QuizzQuestion;
