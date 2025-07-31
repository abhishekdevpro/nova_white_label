import React from 'react';

export default function QuestionPanel({ question, onSubmit, isLoading }) {
  if (!question) return null;

  return (
    <div className="mt-3">
      <h5 className="mb-3 bg-light">
        <strong>Question:</strong> {question.question}
      </h5>

      {/* Uncomment this block if you want to show expected answer (for debugging or feedback)
      <div className="alert alert-info">
        <strong>Expected Answer (Debug):</strong> {question.expected_answer}
      </div>
      */}

      <button
        className="site-button"
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Uploading..." : "Submit Answer"}
      </button>
    </div>
  );
}
