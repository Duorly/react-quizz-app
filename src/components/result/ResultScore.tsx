import React from "react";

interface Props {
  score: number;
  record: number;
  message: string;
}

const ResultScore: React.FC<Props> = ({ score, record, message }) => (
  <div className="flex flex-col items-center">
    <p
      className="drop-shadow-xl text-9xl leading-xl"
      style={{
        fontFamily: "'Jomhuria', cursive",
        color: "#FFA53A",
      }}
    >
      {score}
    </p>

    <p
      className="text-white drop-shadow-lg mt-4 text-6xl"
      style={{
        fontFamily: "'Jomhuria', cursive",
      }}
    >
      Votre record actuel est de {record} points
    </p>

    <p
      className="text-white drop-shadow-lg mt-4 text-5xl"
      style={{
        fontFamily: "'Jomhuria', cursive",
      }}
    >
      {message}
    </p>
  </div>
);

export default ResultScore;
