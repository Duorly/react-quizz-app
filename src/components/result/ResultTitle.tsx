import PageTitle from "../PageTitle";

interface Props {
  text: string;
}

const ResultTitle: React.FC<Props> = ({ text }) => (
  <PageTitle variant="small">{text}</PageTitle>
);

export default ResultTitle;
