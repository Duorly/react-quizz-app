interface Props {
  message: string;
}

const ResultMessage: React.FC<Props> = ({ message }) => (
  <p
    className="text-white drop-shadow-lg mb-8 sm:mb-10
        text-3xl sm:text-4xl md:text-5xl lg:text-[60px]
        leading-tight max-w-4xl"
    style={{ fontFamily: "'Jomhuria', cursive" }}
  >
    {message}
  </p>
);

export default ResultMessage;
