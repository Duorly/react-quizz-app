import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute top-40 left-16 z-20 hover:scale-110 transition-transform"
    >
      <img
        src="https://img.icons8.com/ios-filled/100/arrow.png"
        alt="arrow-back"
        className="w-20 h-20 invert -scale-x-100"
      />
    </button>
  );
};

export default BackButton;
