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

const SuddenDeathQuiz: React.FC = () => {
  const navigate = useNavigate();

  const [question, setQuestion] = useState<ApiQuestion | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  const getDifficulty = () =>
    score < 50 ? "easy" : score < 100 ? "medium" : "hard";

  const loadQuestion = useCallback(async () => {
    setLoading(true);
    setSelected(null);
    setTimeLeft(TOTAL_TIME);

    const url = `https://opentdb.com/api.php?amount=1&difficulty=${getDifficulty()}&type=multiple`;
    const res = await fetch(url);
    const data = await res.json();
    const q = data.results[0];

    const formatted: ApiQuestion = {
      category: decodeHtml(q.category),
      question: decodeHtml(q.question),
      correct_answer: decodeHtml(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map(decodeHtml),
    };

    setQuestion(formatted);

    setAnswers(
      [formatted.correct_answer, ...formatted.incorrect_answers].sort(
        () => Math.random() - 0.5
      )
    );

    setLoading(false);
  }, [score]);

  useEffect(() => {
    loadQuestion();
  }, [loadQuestion]);

  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0.1) {
          clearInterval(interval);
          navigate(`/results?mode=sudden-death&score=${score}`);
          return 0;
        }
        return t - 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [loading, score, navigate]);

  const handleAnswer = (answer: string) => {
    setSelected(answer);

    const isCorrect = answer === question?.correct_answer;
    setTimeout(() => {
      if (!isCorrect) {
        navigate(`/results-sudden-death?score=${score}`);
      } else {
        setScore(score + 1);
      }
    }, 1000);
  };

  if (loading || !question) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-white text-4xl">
        Chargement...
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
        category={question.category}
        questionNumber={score + 1}
        timeLeft={timeLeft}
        totalTime={TOTAL_TIME}
      />

      <QuizzQuestion text={question.question} />

      <QuizzAnswers
        answers={answers}
        selected={selected}
        correct={question.correct_answer}
        onSelect={handleAnswer}
      />
    </div>
  );
};

export default SuddenDeathQuiz;
