import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import backgroundVideo from "../assets/Background_animated.mp4";

import QuizzAnswers from "../components/QuizzAnswers";
import QuizzHeader from "../components/QuizzHeader";
import QuizzQuestion from "../components/QuizzQuestion";
import { decodeHtml } from "../utils/decodeHtml";

interface ApiQuestion {
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

const TOTAL_QUESTIONS = 10;
const TOTAL_TIME = 10;

const CATEGORY_LABELS: Record<string, string> = {
    "9": "CULTURE GENERALE",
    "23": "HISTOIRE",
    "11": "FILMS",
    "21": "SPORTS",
    "17": "SCIENCES & NATURE",
    "mix": "MIX"
};

const ClassicQuizPage: React.FC = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const theme = params.get("theme");
    const difficulty = params.get("difficulty") || "easy";

    const [questions, setQuestions] = useState<ApiQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

    const hasFetched = useRef(false);

    // Chargement de la police si nécessaire
    useEffect(() => {
        const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Jomhuria&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }, []);

    const loadQuestions = useCallback(async () => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        setLoading(true);

        try {
            const url =
                `https://opentdb.com/api.php?amount=${TOTAL_QUESTIONS}` +
                `&difficulty=${difficulty}` +
                (theme && theme !== "mix" ? `&category=${theme}` : "") +
                `&type=multiple`;

            const res = await fetch(url);
            const data = await res.json();

            if (!data.results) {
                console.error("API response invalid", data);
                return;
            }

            const formatted: ApiQuestion[] = data.results.map((q: any) => ({
                category: decodeHtml(q.category),
                question: decodeHtml(q.question),
                correct_answer: decodeHtml(q.correct_answer),
                incorrect_answers: q.incorrect_answers.map(decodeHtml),
            }));

            setQuestions(formatted);
        } catch (error) {
            console.error("Erreur API :", error);
        } finally {
            setLoading(false);
        }
    }, [difficulty, theme]);

    useEffect(() => {
        loadQuestions();
    }, [loadQuestions]);

    useEffect(() => {
        if (loading || !questions.length) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleAnswer(""); // Temps écoulé = mauvaise réponse
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [loading, currentIndex, questions.length]);

    const currentQuestion = questions[currentIndex];

    const handleAnswer = (answer: string) => {
        if (!currentQuestion) return;

        setSelected(answer);

        const isCorrect = answer === currentQuestion.correct_answer;

        // Calcul du nouveau score localement pour éviter les soucis de state asynchrone lors du navigate
        const newScore = isCorrect ? score + 1 : score;
        if (isCorrect) setScore(newScore);

        setTimeout(() => {
            if (currentIndex < TOTAL_QUESTIONS - 1) {
                setCurrentIndex((i) => i + 1);
                setSelected(null);
                setTimeLeft(TOTAL_TIME);
            } else {
                // Important: on passe newScore ici, pas score (qui serait l'ancienne valeur)
                navigate(`/results-classic?score=${newScore}&total=${TOTAL_QUESTIONS}`);
            }
        }, 900);
    };

    const answers = useMemo(() => {
        if (!currentQuestion) return [];
        return [
            currentQuestion.correct_answer,
            ...currentQuestion.incorrect_answers,
        ].sort(() => Math.random() - 0.5);
    }, [currentQuestion]);

    // Affichage du nom de la catégorie
    const displayCategory = useMemo(() => {
        if (theme && CATEGORY_LABELS[theme]) return CATEGORY_LABELS[theme];
        if (currentQuestion) return currentQuestion.category;
        return "QUIZ";
    }, [theme, currentQuestion]);

    if (loading || !currentQuestion) {
        return (
            <div className="w-full h-screen relative flex items-center justify-center overflow-hidden bg-black">
                <video
                    src={backgroundVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="relative z-10 text-white text-4xl font-bold animate-pulse" style={{ fontFamily: "'Jomhuria', cursive" }}>
                    Chargement...
                </div>
            </div>
        );
    }

    return (
        // Utilisation de h-[100dvh] pour le mobile (viewport height dynamique)
        <div className="w-full h-[100dvh] relative overflow-hidden bg-black">

            {/* Vidéo de fond */}
            <video
                src={backgroundVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Container Principal : Flex Column pour distribuer l'espace */}
            <div className="relative z-10 w-full h-full max-w-5xl mx-auto flex flex-col px-4 py-4 sm:px-6 sm:py-6 md:py-8">

                {/* Header (Fixe en haut) */}
                <div className="flex-none mb-4">
                    <QuizzHeader
                        category={displayCategory}
                        questionNumber={currentIndex + 1}
                        timeLeft={timeLeft}
                        totalTime={TOTAL_TIME}
                    />
                </div>

                {/* Question (Prend l'espace central et se centre verticalement) */}
                <div className="flex-1 flex items-center justify-center py-2 sm:py-6">
                    <div className="w-full">
                        <QuizzQuestion text={currentQuestion.question} />
                    </div>
                </div>

                {/* Réponses (Fixe en bas) */}
                <div className="flex-none mt-4 pb-4 sm:pb-8">
                    <QuizzAnswers
                        answers={answers}
                        selected={selected}
                        correct={currentQuestion.correct_answer}
                        onSelect={handleAnswer}
                    />
                </div>

            </div>
        </div>
    );
};

export default ClassicQuizPage;