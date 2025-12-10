interface Props {
  score: number;
  total: number;
}

const ResultScoreClassic: React.FC<Props> = ({ score, total }) => (
  <p
    className="drop-shadow-xl my-2
      text-8xl sm:text-9xl md:text-[150px] lg:text-[200px]
      leading-none"
    style={{
      fontFamily: "'Jomhuria', cursive",
      color: "#9AF76A",
    }}
  >
    {score}/{total}
  </p>
);

export default ResultScoreClassic;
