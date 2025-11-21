interface Props {
  score: number;
  record: number;
  message: string;
}

const ResultScore: React.FC<Props> = ({ score, record, message }) => (
  <div className="flex flex-col items-center">
    <p
      className="mt-6 drop-shadow-xl"
      style={{
        fontFamily: "'Jomhuria', cursive",
        fontSize: "200px",
        color: "#FFA53A",
      }}
    >
      {score}
    </p>

    <p
      className="text-white drop-shadow-lg mt-4"
      style={{
        fontFamily: "'Jomhuria', cursive",
        fontSize: "65px",
      }}
    >
      Votre record actuel est de {record} points
    </p>

    <p
      className="text-white drop-shadow-lg mt-4"
      style={{
        fontFamily: "'Jomhuria', cursive",
        fontSize: "60px",
      }}
    >
      {message}
    </p>
  </div>
);

export default ResultScore;
