import { FiHome, FiRotateCcw } from "react-icons/fi"; // flèche + maison
import { useNavigate } from "react-router-dom";

const ResultButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-28 mt-16">
      {/* REJOUER */}
      <button
        onClick={() => navigate("/sudden-death")}
        className="flex items-center gap-4 px-14 py-6 bg-white text-black rounded-xl shadow-lg hover:scale-105 transition-transform"
        style={{
          fontFamily: "'Jomhuria', cursive",
          fontSize: "60px",
        }}
      >
        <FiRotateCcw size={50} />
      </button>

      {/* MENU */}
      <button
        onClick={() => navigate("/quizz-selection")}
        className="flex items-center gap-4 px-14 py-6 bg-white text-black rounded-xl shadow-lg hover:scale-105 transition-transform"
        style={{
          fontFamily: "'Jomhuria', cursive",
          fontSize: "60px",
        }}
      >
        <FiHome size={50} />
      </button>
    </div>
  );
};

export default ResultButtons;
