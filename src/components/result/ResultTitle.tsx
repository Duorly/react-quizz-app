interface Props {
  text: string;
}

const ResultTitle: React.FC<Props> = ({ text }) => (
  <h1
    className="text-white drop-shadow-lg"
    style={{
      fontFamily: "'Jomhuria', cursive",
      fontSize: "120px",
    }}
  >
    {text}
  </h1>
);

export default ResultTitle;
