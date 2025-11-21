import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const TOTAL_TIME = 10;
const QUESTIONS_TO_LOAD = 20;

const SuddenDeathQuiz: React.FC = () => {
    const navigate = useNavigate();

    const [questions, setQuestions] = useState<ApiQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

    const getDifficulty = () =>
        score < 5 ? "easy" : score < 10 ? "medium" : "hard";

    // Charger toutes les questions au début
    const loadAllQuestions = useCallback(async () => {
        setLoading(true);
        try {
            // Vérifier s'il y a des questions sauvegardées
            const savedQuestions = sessionStorage.getItem('suddenDeathQuestions');

            if (savedQuestions) {
                // Utiliser les questions sauvegardées
                const parsed = JSON.parse(savedQuestions);
                setQuestions(parsed);
                setCurrentIndex(0);
                sessionStorage.removeItem('suddenDeathQuestions');
            } else {
                // Charger de nouvelles questions
                const url = `https://opentdb.com/api.php?amount=${QUESTIONS_TO_LOAD}&difficulty=${getDifficulty()}&type=multiple`;
                const res = await fetch(url);
                const data = await res.json();

                const formatted: ApiQuestion[] = data.results.map((q: any) => ({
                    category: decodeHtml(q.category),
                    question: decodeHtml(q.question),
                    correct_answer: decodeHtml(q.correct_answer),
                    incorrect_answers: q.incorrect_answers.map(decodeHtml),
                }));

                setQuestions(formatted);
                setCurrentIndex(0);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des questions:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Charger les questions au montage (une seule fois)
    useEffect(() => {
        loadAllQuestions();
    }, []);

    // Préparer la question actuelle
    useEffect(() => {
        if (questions.length > 0 && currentIndex < questions.length) {
            const currentQuestion = questions[currentIndex];
            setAnswers(
                [
                    currentQuestion.correct_answer,
                    ...currentQuestion.incorrect_answers,
                ].sort(() => Math.random() - 0.5)
            );
            setSelected(null);
            setTimeLeft(TOTAL_TIME);
        }
    }, [currentIndex, questions]);

    // Timer
    useEffect(() => {
        if (loading || questions.length === 0) return;

        const interval = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 0.1) {
                    clearInterval(interval);
                    navigate(`/results-sudden-death?score=${score}`);
                    return 0;
                }
                return t - 0.1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [loading, score, navigate, questions.length]);

    const handleAnswer = (answer: string) => {
        if (selected) return; // Empêcher les clics multiples

        setSelected(answer);

        const currentQuestion = questions[currentIndex];
        const isCorrect = answer === currentQuestion.correct_answer;

        setTimeout(() => {
            if (!isCorrect) {
                // Stocker les questions restantes (sauf celle échouée) dans sessionStorage
                const remainingQuestions = [
                    ...questions.slice(0, currentIndex),
                    ...questions.slice(currentIndex + 1)
                ];
                sessionStorage.setItem('suddenDeathQuestions', JSON.stringify(remainingQuestions));
                navigate(`/results-sudden-death?score=${score}`);
            } else {
                const newScore = score + 1;
                setScore(newScore);

                // Passer à la question suivante
                if (currentIndex + 1 < questions.length) {
                    setCurrentIndex(currentIndex + 1);
                } else {
                    // Si on a épuisé les 20 questions, recharger
                    sessionStorage.removeItem('suddenDeathQuestions');
                    loadAllQuestions();
                }
            }
        }, 1000);
    };

    if (loading || questions.length === 0) {
        return (
            <div className="w-screen h-screen flex items-center justify-center text-white text-4xl">
                Chargement...
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    return (
        <div className="w-screen h-screen relative flex flex-col items-center py-10 px-6">
            <video
                src={backgroundVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />

            <QuizzHeader
                category={currentQuestion.category}
                questionNumber={score + 1}
                timeLeft={timeLeft}
                totalTime={TOTAL_TIME}
            />

            <QuizzQuestion text={currentQuestion.question} />

            <QuizzAnswers
                answers={answers}
                selected={selected}
                correct={currentQuestion.correct_answer}
                onSelect={handleAnswer}
            />
        </div>
    );
};

export default SuddenDeathQuiz;