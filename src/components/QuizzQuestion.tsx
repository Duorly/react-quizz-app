import React from "react";

interface QuizzQuestionProps {
  text: string;
}

const QuizzQuestion: React.FC<QuizzQuestionProps> = ({ text }) => {
  return (
    <div className="relative z-10 mt-12 text-center max-w-4xl">
      <p
        className="text-white drop-shadow-lg leading-snug"
        style={{
          fontFamily: "'Jomhuria', cursive",
          fontSize: "75px",
          lineHeight: "65px",
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default QuizzQuestion;
