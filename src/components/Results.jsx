import React, { useState } from 'react';
import { formatMarkdown } from '../utils/formatText';

const Results = ({ score, totalQuestions, answers, questions, onRestart }) => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const correctAnswers = answers.filter(a => a.correct).length;
  const percentage = (correctAnswers / totalQuestions) * 100;

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const getMotivationalContent = (score) => {
    if (score <= -5) {
      return {
        emoji: "📉",
        title: "Every Failure is a Step to Success",
        quote: "Our greatest glory is not in never falling, but in rising every time we fall. — Confucius",
        encouragement: "Mistakes are just lessons. Keep trying, and you'll improve!"
      };
    } else if (score <= 5) {
      return {
        emoji: "📊",
        title: "The Journey Matters More Than the Outcome",
        quote: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment. — Buddha",
        encouragement: "Focus on learning, not just the score. Every attempt sharpens your mind!"
      };
    } else if (score <= 15) {
      return {
        emoji: "📈",
        title: "Keep Moving Forward",
        quote: "It does not matter how slowly you go as long as you do not stop. — Confucius",
        encouragement: "You're on the right track. Small progress is still progress!"
      };
    } else if (score <= 30) {
      return {
        emoji: "🚀",
        title: "Success is a Habit",
        quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit. — Aristotle",
        encouragement: "Your consistent efforts are paying off. Keep practicing!"
      };
    } else {
      return {
        emoji: "🏆",
        title: "Mastery Through Dedication",
        quote: "An unexamined life is not worth living. — Socrates",
        encouragement: "You're excelling, but never stop questioning and learning!"
      };
    }
  };

  const motivation = getMotivationalContent(score);

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Quiz Results</h2>
      
      <div className="mb-8 text-center">
        <div className="text-6xl mb-4">{motivation.emoji}</div>
        <p className="text-5xl font-bold text-blue-500 mb-4">{score} points</p>
        <p className="text-xl text-gray-600 mb-2">
          {correctAnswers} out of {totalQuestions} correct
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-blue-500 h-4 rounded-full transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-lg font-semibold mb-8">
          {percentage >= 80 ? '🎉 Excellent!' 
           : percentage >= 60 ? '👍 Good job!' 
           : '💪 Keep practicing!'}
        </p>

        {/* Motivational Section */}
        <div className="my-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">{motivation.title}</h3>
          <p className="text-gray-700 italic mb-4">{motivation.quote}</p>
          <p className="text-blue-600 font-medium">💡 {motivation.encouragement}</p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <h3 className="text-xl font-semibold">Question Review</h3>
        {answers.map((answer, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg ${
              answer.correct ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            <div 
              onClick={() => toggleQuestion(index)}
              className="cursor-pointer flex justify-between items-center"
            >
              <div>
                <p className="font-medium mb-2">Question {index + 1}:</p>
                <p className="mb-2">{questions[index].description}</p>
              </div>
              <span className="text-2xl">
                {expandedQuestion === index ? '−' : '+'}
              </span>
            </div>

            {expandedQuestion === index && (
              <div className="mt-4 space-y-4">
                {/* Selected Answer */}
                <div className="p-3 bg-white rounded">
                  <p className="text-sm font-medium text-gray-600">Your Answer:</p>
                  <p className={`text-sm ${answer.correct ? 'text-green-600' : 'text-red-600'}`}>
                    {answer.selectedOption.description}
                  </p>
                </div>

                {/* Correct Answer if wrong */}
                {!answer.correct && (
                  <div className="p-3 bg-green-50 rounded">
                    <p className="text-sm font-medium text-gray-600">Correct Answer:</p>
                    <p className="text-sm text-green-600">
                      {questions[index].options.find(opt => opt.is_correct).description}
                    </p>
                  </div>
                )}

                {/* Detailed Solution */}
                {questions[index].detailed_solution && (
                  <div className="p-3 bg-blue-50 rounded">
                    <p className="text-sm font-medium text-blue-600">Explanation:</p>
                    <div 
                      className="text-sm text-gray-600"
                      dangerouslySetInnerHTML={{ 
                        __html: formatMarkdown(questions[index].detailed_solution) 
                      }}
                    />
                  </div>
                )}

                {/* Study Material */}
                {questions[index].reading_material && (
                  <div className="mt-4 p-4 bg-gray-50 rounded">
                    <p className="text-sm font-medium text-gray-600 mb-2">Study Material:</p>
                    {questions[index].reading_material.content_sections.map((section, sIndex) => (
                      <div 
                        key={sIndex}
                        dangerouslySetInnerHTML={{ __html: section }}
                        className="prose max-w-none text-sm"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Results;