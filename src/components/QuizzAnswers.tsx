import React from "react";

interface AnswersProps {
  answers: string[];
  selected: string | null;
  correct: string;
  onSelect: (value: string) => void;
}

const QuizzAnswers: React.FC<AnswersProps> = ({
  answers,
  selected,
  correct,
  onSelect,
}) => {
  return (
    <div className="relative z-10 grid grid-cols-2 gap-30 mt-36 w-full max-w-[90rem] mx-auto">
      {answers.map((ans, index) => {
        const isCorrect = ans === correct;
        const isSelected = ans === selected;

        let bg = "bg-gray-300 text-black";
        if (selected) {
          if (isCorrect) bg = "bg-green-600 text-white";
          else if (isSelected) bg = "bg-red-600 text-white";
        }

        return (
          <button
            key={index}
            disabled={!!selected}
            onClick={() => onSelect(ans)}
            className={`${bg} py-6 rounded-xl shadow-lg transition-transform hover:scale-105`}
            style={{
              fontFamily: "'Jomhuria', cursive",
              fontSize: "85px",
            }}
          >
            {ans}
          </button>
        );
      })}
    </div>
  );
};

export default QuizzAnswers;
