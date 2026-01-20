import "./ProgressBar.css";

function ProgressBar({ currentIndex, totalQuestions }) {
  const percentage = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="progress-text">
          Question <strong>{currentIndex + 1}</strong> of{" "}
          <strong>{totalQuestions}</strong>
        </span>
        <span className="progress-percentage">{Math.round(percentage)}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
