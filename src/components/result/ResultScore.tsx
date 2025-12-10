interface Props {
  score: number;
  record: number;
}

const ResultScore: React.FC<Props> = ({ score, record }) => {
  return (
    <div className="flex flex-col items-center">
      <p
        className="drop-shadow-xl my-2
          text-8xl sm:text-9xl md:text-[150px] lg:text-[200px]
          leading-none"
        style={{
          fontFamily: "'Jomhuria', cursive",
          color: "#FFA53A",
        }}
      >
        {score}
      </p>

      <p
        className="text-white drop-shadow-lg mt-2
          text-3xl sm:text-4xl md:text-5xl lg:text-[55px]"
        style={{ fontFamily: "'Jomhuria', cursive" }}
      >
        Votre record actuel est de {record} points
      </p>
    </div>
  );
};

export default ResultScore;
