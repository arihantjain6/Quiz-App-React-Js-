import { useState, useEffect } from "react";
import questions from "../data/questions";
import Question from "./Question";
import ProgressBar from "./ProgressBar";
import Result from "./Result";
import "./Quiz.css";

const STORAGE_KEY = "quizState";

function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const {
          currentIndex: savedIndex,
          answers: savedAnswers,
          showResult: savedShowResult,
        } = JSON.parse(saved);
        if (savedAnswers && Array.isArray(savedAnswers)) {
          setCurrentIndex(savedIndex || 0);
          setAnswers(savedAnswers);
          setShowResult(savedShowResult || false);
          if (savedAnswers[savedIndex || 0] !== null) {
            setShowFeedback(true);
          }
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (!showResult) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ currentIndex, answers, showResult }),
      );
    }
  }, [currentIndex, answers, showResult]);

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
    setShowFeedback(true);
  };

  const handlePrevious = () => {
    setShowFeedback(answers[currentIndex - 1] !== null);
    setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    setShowFeedback(answers[currentIndex + 1] !== null);
    setCurrentIndex(currentIndex + 1);
  };

  const handleSubmit = () => {
    setShowResult(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers(Array(questions.length).fill(null));
    setShowResult(false);
    setShowFeedback(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return answer === questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  const isCurrentAnswered = answers[currentIndex] !== null;
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === questions.length - 1;

  if (showResult) {
    return (
      <Result
        score={calculateScore()}
        totalQuestions={questions.length}
        answers={answers}
        questions={questions}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="quiz-container">
      <ProgressBar
        currentIndex={currentIndex}
        totalQuestions={questions.length}
      />

      <Question
        question={questions[currentIndex]}
        selectedAnswer={answers[currentIndex]}
        onSelect={handleAnswerSelect}
        showFeedback={showFeedback}
      />

      <div className="navigation-buttons">
        <button
          className="nav-btn prev-btn"
          onClick={handlePrevious}
          disabled={isFirstQuestion}
        >
          <span className="btn-icon">←</span>
          <span className="btn-text">Previous</span>
        </button>

        {isLastQuestion ? (
          <button
            className="nav-btn submit-btn"
            onClick={handleSubmit}
            disabled={!isCurrentAnswered}
          >
            <span className="btn-text">Submit</span>
            <span className="btn-icon">✓</span>
          </button>
        ) : (
          <button
            className="nav-btn next-btn"
            onClick={handleNext}
            disabled={!isCurrentAnswered}
          >
            <span className="btn-text">Next</span>
            <span className="btn-icon">→</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
