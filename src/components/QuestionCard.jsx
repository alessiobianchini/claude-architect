import React from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import './QuestionCard.css';

const QuestionCard = ({ question, selectedOption, onSelectOption }) => {
  if (!question) return null;

  const isAnswered = selectedOption !== null;

  return (
    <div className="question-card animate-slide-up" key={question.global_n}>
      <div className="scenario-badge">{question.scenario}</div>
      <h2 className="question-number">Question {question.global_n}</h2>
      
      <div className="situation glass">
        <p dangerouslySetInnerHTML={{ __html: question.situation.replace(/`([^`]+)`/g, '<code>$1</code>') }} />
      </div>

      <h3 className="prompt">{question.question}</h3>

      <div className="options-list">
        {question.options.map((opt) => {
          const isSelected = selectedOption === opt.letter;
          let optionClass = "option glass";
          let Icon = null;

          if (isAnswered) {
            optionClass += " locked";
            if (opt.letter === question.correct) {
              optionClass += " correct";
              Icon = CheckCircle2;
            } else if (isSelected) {
              optionClass += " wrong";
              Icon = XCircle;
            } else {
              optionClass += " dimmed";
            }
          } else if (isSelected) {
            optionClass += " selected";
          }

          return (
            <button 
              key={opt.letter}
              className={optionClass}
              onClick={() => !isAnswered && onSelectOption(opt.letter)}
              disabled={isAnswered}
            >
              <div className="opt-letter">{opt.letter}</div>
              <div className="opt-text" dangerouslySetInnerHTML={{ __html: opt.text.replace(/`([^`]+)`/g, '<code>$1</code>') }} />
              {Icon && <Icon className="opt-icon" size={20} />}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="explanation glass animate-fade-in">
          <div className="expl-header">
            <AlertCircle size={18} />
            <strong>Explanation</strong>
          </div>
          <p dangerouslySetInnerHTML={{ __html: question.explanation.replace(/`([^`]+)`/g, '<code>$1</code>') }} />
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
