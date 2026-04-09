import React from 'react';

function QuestionCard({ question, questionNumber, totalQuestions, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fadeIn">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-be-vietnam text-sm text-gray-500">
            Câu hỏi {questionNumber} / {totalQuestions}
          </span>
          <span className="font-be-vietnam text-xs px-3 py-1 bg-gold/10 text-gold rounded-full">
            {question.category}
          </span>
        </div>
        <h2 className="font-be-vietnam font-semibold text-xl md:text-2xl text-navy">
          {question.text}
        </h2>
      </div>

      {/* Answer options */}
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}

export default QuestionCard;