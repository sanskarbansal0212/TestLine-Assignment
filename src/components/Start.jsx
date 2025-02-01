import React from 'react';

const Start = ({ quizData, onStart }) => {
  return (
    <div className="text-center bg-white rounded-lg shadow-md p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{quizData.title}</h1>
        <div className="h-1 w-20 bg-blue-500 mx-auto rounded"></div>
      </div>
      
      <div className="mb-8 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Topic</p>
          <p className="font-medium">{quizData.topic}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Duration</p>
          <p className="font-medium">{quizData.duration} minutes</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Questions</p>
          <p className="font-medium">{quizData.questions_count}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Marks</p>
          <p className="font-medium text-blue-600">
            +{quizData.correct_answer_marks} / -{quizData.negative_marks}
          </p>
        </div>
      </div>

      <button
        onClick={onStart}
        className="bg-blue-500 text-white px-12 py-4 rounded-full text-lg font-medium
                 hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Start;