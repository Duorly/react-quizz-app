import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { QuizzSelectionButton } from "../components/QuizzSelectionButton";
import Background from "../components/Background";

const QuizzSelection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen relative">
            <Background />
            <div className="absolute inset-0" />

            <div className="absolute top-8 sm:top-16 md:top-24 lg:top-32 xl:top-40 left-0 right-0 flex justify-center z-10 px-4">
                <PageTitle variant="medium">CHOISISSEZ VOTRE QUIZZ</PageTitle>
            </div>

            <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-24 mt-12 sm:mt-16 md:mt-20 w-full max-w-6xl">
                    <QuizzSelectionButton
                        label="MORT SUBITE"
                        onClick={() => navigate("/countdown?mode=sudden-death")}
                        bgColorClass="bg-black"
                        textColorClass="text-white"
                    />
                    <QuizzSelectionButton
                        label="CLASSIQUE"
                        onClick={() => navigate("/theme-selection")}
                        bgColorClass="bg-gray-200"
                        textColorClass="text-black"
                    />
                </div>
            </div>
        </div>
    );
};

export default QuizzSelection;