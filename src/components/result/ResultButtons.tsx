import { FiHome, FiRotateCcw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface Props {
  replayPath: string;
}

const ResultButtons: React.FC<Props> = ({ replayPath }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-28 mt-6">
      <button
        onClick={() => navigate(replayPath)}
        className="flex items-center gap-4 px-14 py-6 bg-white text-black rounded-xl shadow-lg hover:scale-105 transition-transform"
      >
        <FiRotateCcw size={50} />
      </button>

      <button
        onClick={() => navigate("/quizz-selection")}
        className="flex items-center gap-4 px-14 py-6 bg-white text-black rounded-xl shadow-lg hover:scale-105 transition-transform"
      >
        <FiHome size={50} />
      </button>
    </div>
  );
};

export default ResultButtons;
