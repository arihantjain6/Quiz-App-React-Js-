import "./Question.css";

function Question({ question, selectedAnswer, onSelect, showFeedback }) {
  const handleOptionChange = (index) => {
    if (selectedAnswer === null) {
      onSelect(index);
    }
  };

  const getOptionClassName = (index) => {
    let className = "option";

    if (showFeedback && selectedAnswer !== null) {
      if (index === question.correctAnswer) {
        className += " correct";
      } else if (
        index === selectedAnswer &&
        selectedAnswer !== question.correctAnswer
      ) {
        className += " incorrect";
      }
    }

    if (selectedAnswer === index) {
      className += " selected";
    }

    return className;
  };

  return (
    <div className="question-container">
      <fieldset>
        <legend className="question-text">{question.question}</legend>
        <div className="options-list">
          {question.options.map((option, index) => (
            <div key={index} className={getOptionClassName(index)}>
              <input
                type="radio"
                id={`option-${question.id}-${index}`}
                name={`question-${question.id}`}
                value={index}
                checked={selectedAnswer === index}
                onChange={() => handleOptionChange(index)}
                disabled={selectedAnswer !== null}
              />
              <label htmlFor={`option-${question.id}-${index}`}>
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{option}</span>
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export default Question;
