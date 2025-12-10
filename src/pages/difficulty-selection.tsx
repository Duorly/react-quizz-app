import { useNavigate, useSearchParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import PageTitle from "../components/PageTitle";
import DifficultyButton from "../components/DifficultyButton";
import Background from "../components/Background";

const difficulties = [
    { level: "easy", label: "EASY", color: "#9CFF7E" },
    { level: "medium", label: "MEDIUM", color: "#FFBD7B" },
    { level: "hard", label: "EXPERT", color: "#DB5D5D" },
];

const DifficultySelection: React.FC = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const theme = params.get("theme");

  const handleDifficulty = (level: string) => {
    const queryTheme = theme && theme !== "null" ? `theme=${theme}&` : "";
    navigate(`/countdown?${queryTheme}difficulty=${level}&seconds=3`);

  };

    return (
        <div className="w-screen h-screen relative">
            <Background />

      <div className="absolute inset-0 bg-black/20" />

      <BackButton />

            <div className="absolute top-6 sm:top-12 md:top-20 lg:top-32 xl:top-40 left-0 right-0 flex justify-center z-10 px-4">
                <PageTitle variant="small">CHOISISSEZ UNE DIFFICULTÉ</PageTitle>
            </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 pt-20 sm:pt-24 md:pt-28">
        <div className="flex flex-col sm:flex-row
          gap-4 sm:gap-6 md:gap-10 lg:gap-16 xl:gap-20
          w-full max-w-6xl">

          {difficulties.map((d) => (
            <DifficultyButton
              key={d.level}
              label={d.label}
              color={d.color}
              onClick={() => handleDifficulty(d.level)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DifficultySelection;
