/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const CATEGORY_LABELS: Record<string, string> = {
  "9": "CULTURE GENERALE",
  "23": "HISTOIRE",
  "11": "FILMS",
  "21": "SPORTS",
  "17": "SCIENCES & NATURE",
};

const displayCategory = theme
  ? CATEGORY_LABELS[theme] || currentQuestion.category
  : "MIX";

  const loadQuestions = useCallback(async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    setLoading(true);

    try {
      const url =
        `https://opentdb.com/api.php?amount=${TOTAL_QUESTIONS}` +
        `&difficulty=${difficulty}` +
        (theme ? `&category=${theme}` : "") +
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
          handleAnswer("");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, currentIndex]);

  const handleAnswer = (answer: string) => {
    const current = questions[currentIndex];
    if (!current) return;

    setSelected(answer);

    const isCorrect = answer === current.correct_answer;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentIndex < TOTAL_QUESTIONS - 1) {
        setCurrentIndex((i) => i + 1);
        setSelected(null);
        setTimeLeft(TOTAL_TIME);
      } else {
        navigate(`/results-classic?score=${score}&total=${TOTAL_QUESTIONS}`);
      }
    }, 900);
  };

  const currentQuestion = questions[currentIndex];

  const answers = useMemo(() => {
    if (!currentQuestion) return [];
    return [
      currentQuestion.correct_answer,
      ...currentQuestion.incorrect_answers,
    ].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  if (loading || !currentQuestion) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-white text-4xl">
        Chargement du quiz...
      </div>
    );
  }

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
        category={displayCategory}
        questionNumber={currentIndex + 1}
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

export default ClassicQuizPage;
