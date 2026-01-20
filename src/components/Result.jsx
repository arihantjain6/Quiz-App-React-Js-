import "./Result.css";

function Result({ score, totalQuestions, answers, questions, onRestart }) {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getPerformance = () => {
    if (percentage === 100) return { emoji: "🏆", message: "Perfect Score!" };
    if (percentage >= 80) return { emoji: "🌟", message: "Excellent!" };
    if (percentage >= 60) return { emoji: "👍", message: "Good Job!" };
    if (percentage >= 40) return { emoji: "📚", message: "Keep Practicing!" };
    return { emoji: "💪", message: "Don't Give Up!" };
  };

  const perf = getPerformance();

  return (
    <div className="result-container">
      <div className="result-header">
        <span className="result-emoji">{perf.emoji}</span>
        <h2 className="result-title">Quiz Completed!</h2>
        <p className="result-message">{perf.message}</p>
      </div>

      <div className="score-card">
        <div className="score-circle">
          <svg viewBox="0 0 100 100">
            <circle className="score-bg" cx="50" cy="50" r="45" />
            <circle
              className="score-progress"
              cx="50"
              cy="50"
              r="45"
              style={{ strokeDasharray: `${percentage * 2.83} 283` }}
            />
          </svg>
          <div className="score-text">
            <span className="score-value">{score}</span>
            <span className="score-total">/{totalQuestions}</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-item correct">
          <span className="stat-icon">✓</span>
          <span className="stat-value">{score}</span>
          <span className="stat-label">Correct</span>
        </div>
        <div className="stat-item incorrect">
          <span className="stat-icon">✗</span>
          <span className="stat-value">{totalQuestions - score}</span>
          <span className="stat-label">Incorrect</span>
        </div>
        <div className="stat-item percentage">
          <span className="stat-icon">%</span>
          <span className="stat-value">{percentage}</span>
          <span className="stat-label">Score</span>
        </div>
      </div>

      <div className="answers-review">
        <h3>Answer Review</h3>
        {questions.map((q, i) => (
          <div
            key={q.id}
            className={`review-item ${answers[i] === q.correctAnswer ? "review-correct" : "review-incorrect"}`}
          >
            <div className="review-header">
              <span className="review-number">Q{i + 1}</span>
              <span
                className={`review-status ${answers[i] === q.correctAnswer ? "correct" : "incorrect"}`}
              >
                {answers[i] === q.correctAnswer ? "✓ Correct" : "✗ Incorrect"}
              </span>
            </div>
            <p className="review-question">{q.question}</p>
            <div className="review-answers">
              <p className="your-answer">
                <strong>Your answer:</strong> {q.options[answers[i]]}
              </p>
              {answers[i] !== q.correctAnswer && (
                <p className="correct-answer">
                  <strong>Correct answer:</strong> {q.options[q.correctAnswer]}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="restart-btn" onClick={onRestart}>
        <span className="restart-icon">↻</span>
        Take Quiz Again
      </button>
    </div>
  );
}

export default Result;
