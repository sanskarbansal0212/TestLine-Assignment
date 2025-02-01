import React, { useState } from 'react';

const Question = ({ question, onAnswer, currentNumber, total, onPrevious, previousAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(previousAnswer);
  const [showStudyMaterial, setShowStudyMaterial] = useState(false);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    onAnswer(option.is_correct, question.detailed_solution, option);
  };

  return (
    <div className="space-y-6">
      {/* Study Material Button */}
      {question.reading_material && (
        <button 
          onClick={() => setShowStudyMaterial(!showStudyMaterial)}
          className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
        >
          {showStudyMaterial ? '✖ Hide' : '📚 Show'} Study Material
        </button>
      )}

      {/* Study Material Content */}
      {showStudyMaterial && question.reading_material && (
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          {question.reading_material.content_sections.map((section, index) => (
            <div 
              key={index}
              dangerouslySetInnerHTML={{ __html: section }}
              className="prose max-w-none"
            />
          ))}
        </div>
      )}

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            {currentNumber > 1 && (
              <button onClick={onPrevious} className="text-blue-500 hover:text-blue-700">
                ← Previous
              </button>
            )}
            <div className="text-sm text-gray-500">
              Question {currentNumber} of {total}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Topic: {question.topic}
            </span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentNumber / total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-6">{question.description}</h2>
        
        <div className="space-y-4">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswerClick(option)}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-300 
                ${selectedAnswer === option 
                  ? 'bg-blue-100 border-blue-500' 
                  : 'border-gray-200 hover:bg-blue-50'}`}
            >
              {option.description}
            </button>
          ))}
        </div>

        {/* Question Metadata */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Level: {question.difficulty_level || 'Not specified'}</span>
           
            {question.tag && <span>Tag: {question.tag}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
