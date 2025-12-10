interface Props {
  score: number;
  isNewRecord: boolean;
}

const ResultMessageSuddenDeath: React.FC<Props> = ({ score, isNewRecord }) => {
  let message = "";

  if (isNewRecord && score !== 0) message = "C'est un nouveau record bravo !";
  else if (score < 10) message = "Allez, tu peux faire mieux !";
  else if (score < 20) message = "Pas mal du tout !";
  else if (score < 40) message = "C'est un très bon score !";
  else message = "Incroyable performance !";

  return (
    <p
      className="text-white drop-shadow-lg mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-[60px]"
      style={{ fontFamily: "'Jomhuria', cursive" }}
    >
      {message}
    </p>
  );
};

export default ResultMessageSuddenDeath;
