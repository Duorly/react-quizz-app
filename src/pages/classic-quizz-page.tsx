import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import backgroundVideo from "../assets/Background_animated.mp4";

import QuizzAnswers from "../components/QuizzAnswers";
import QuizzHeader from "../components/QuizzHeader";
import QuizzQuestion from "../components/QuizzQuestion";
import {decodeHtml} from "../utils/decodeHtml";

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

    // États de chargement et d'erreur
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const hasFetched = useRef(false);

    useEffect(() => {
        const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Jomhuria&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }, []);

    // --- NOUVELLE LOGIQUE DE CHARGEMENT ---
    const loadQuestions = useCallback(async () => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        setLoading(true);
        setError(null);

        // Fonction interne pour faire l'appel API
        const fetchFromApi = async (useDifficulty: boolean) => {
            let url = `https://opentdb.com/api.php?amount=${TOTAL_QUESTIONS}&type=multiple`;

            // On ajoute le thème si ce n'est pas MIX
            if (theme && theme !== "mix") {
                url += `&category=${theme}`;
            }

            // On ajoute la difficulté SEULEMENT si useDifficulty est true
            if (useDifficulty) {
                url += `&difficulty=${difficulty}`;
            }

            const res = await fetch(url);
            const data = await res.json();
            return data;
        };

        try {
            // 1. Premier essai : Avec la difficulté demandée
            console.log("Tentative de chargement avec difficulté...");
            let data = await fetchFromApi(true);

            // 2. Si code 1 (Pas assez de résultats), on réessaie SANS la difficulté (mode fallback)
            if (data.response_code === 1) {
                console.warn("Pas assez de questions, tentative sans difficulté...");
                data = await fetchFromApi(false);
            }

            // 3. Gestion des erreurs restantes
            if (data.response_code !== 0) {
                if (data.response_code === 5) throw new Error("Trop de requêtes (Rate Limit). Attendez 5 secondes.");
                throw new Error(`Erreur API Code: ${data.response_code}`);
            }

            if (!data.results || data.results.length === 0) {
                throw new Error("Aucune question trouvée.");
            }

            // 4. Formatage
            const formatted: ApiQuestion[] = data.results.map((q: any) => ({
                category: decodeHtml(q.category),
                question: decodeHtml(q.question),
                correct_answer: decodeHtml(q.correct_answer),
                incorrect_answers: q.incorrect_answers.map(decodeHtml),
            }));

            setQuestions(formatted);

        } catch (err: any) {
            console.error("Erreur finale :", err);
            setError(err.message || "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    }, [difficulty, theme]);

    useEffect(() => {
        loadQuestions();
    }, [loadQuestions]);

    // Timer logic
    useEffect(() => {
        if (loading || error || !questions.length) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleAnswer("");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [loading, error, currentIndex, questions.length]);

    const currentQuestion = questions[currentIndex];

    const handleAnswer = (answer: string) => {
        if (!currentQuestion) return;
        setSelected(answer);

        const isCorrect = answer === currentQuestion.correct_answer;
        const newScore = isCorrect ? score + 1 : score;
        if (isCorrect) setScore(newScore);

        setTimeout(() => {
            if (currentIndex < TOTAL_QUESTIONS - 1) {
                setCurrentIndex((i) => i + 1);
                setSelected(null);
                setTimeLeft(TOTAL_TIME);
            } else {
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

    const displayCategory = useMemo(() => {
        if (theme && CATEGORY_LABELS[theme]) return CATEGORY_LABELS[theme];
        if (currentQuestion) return currentQuestion.category;
        return "QUIZ";
    }, [theme, currentQuestion]);

    // --- AFFICHAGE DES ERREURS ET DU CHARGEMENT ---

    if (loading) {
        return (
            <div className="w-full h-[100dvh] relative flex items-center justify-center bg-black overflow-hidden">
                <video src={backgroundVideo} autoPlay loop muted playsInline
                       className="absolute inset-0 w-full h-full object-cover opacity-50"/>
                <div className="relative z-10 text-white text-4xl animate-pulse font-bold"
                     style={{fontFamily: "'Jomhuria', cursive"}}>
                    Chargement des questions...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="w-full h-[100dvh] relative flex flex-col items-center justify-center bg-black overflow-hidden px-4">
                <video src={backgroundVideo} autoPlay loop muted playsInline
                       className="absolute inset-0 w-full h-full object-cover opacity-30"/>
                <div
                    className="relative z-10 bg-gray-900/80 p-8 rounded-xl border border-red-500/50 text-center max-w-md">
                    <h2 className="text-red-400 text-3xl mb-4" style={{fontFamily: "'Jomhuria', cursive"}}>Oups !</h2>
                    <p className="text-white mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    if (!currentQuestion) return null;

    return (
        <div className="w-full h-[100dvh] relative bg-black">
            {/* 1. La Vidéo reste en arrière-plan et ne bouge pas */}
            <video
                src={backgroundVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"/>

            {/* 2. Le conteneur de défilement (Z-Index par dessus la vidéo) */}
            <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden">

                {/* 3. Le Layout Flexible : min-h-full permet de scroller si ça dépasse */}
                <div className="min-h-full flex flex-col justify-between max-w-5xl mx-auto px-4 py-4 sm:px-6 sm:py-6">

                    <div className="flex-none mb-4">
                        <QuizzHeader
                            category={displayCategory}
                            questionNumber={currentIndex + 1}
                            timeLeft={timeLeft}
                            totalTime={TOTAL_TIME}
                        />
                    </div>

                    <div className="flex-grow flex items-center justify-center py-4">
                        <div className="w-full">
                            <QuizzQuestion text={currentQuestion.question}/>
                        </div>
                    </div>

                    <div className="flex-none mt-4 pb-8 sm:pb-10">
                        <QuizzAnswers
                            answers={answers}
                            selected={selected}
                            correct={currentQuestion.correct_answer}
                            onSelect={handleAnswer}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ClassicQuizPage;