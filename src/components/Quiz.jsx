import React, { useState } from 'react';
import Start from './Start';
import Question from './Question';
import Results from './Results';
import Fetch from './Fetch';

const QuizHeader = () => (
  <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 mb-8">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quiz Test</h1>
          <a 
            href="https://github.com/sanskarbansal0212" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-blue-100 hover:text-white hover:underline"
          >
            by Sanskar Bansal
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm bg-blue-700 px-3 py-1 rounded-full">Testline</span>
        </div>
      </div>
    </div>
  </div>
);

const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [streak, setStreak] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleDataReceived = (data) => {
    setQuizData(data);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
    setAnswers([]);
    setStreak(0);
    setUserAnswers([]);
  };

  const handleAnswer = (isCorrect, explanation, selectedOption) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = {
      questionIndex: currentQuestion,
      correct: isCorrect,
      explanation: explanation,
      selectedOption: selectedOption
    };
    setUserAnswers(newAnswers);

    // Only proceed to next question if we haven't answered all questions
    if (currentQuestion + 1 < quizData.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final score only when all questions are answered
      let finalScore = 0;
      let currentStreak = 0;
      newAnswers.forEach(answer => {
        if (answer.correct) {
          const streakBonus = Math.min(currentStreak, 3);
          const points = Number(quizData.correct_answer_marks) * (1 + streakBonus * 0.5);
          finalScore += points;
          currentStreak++;
        } else {
          finalScore -= Number(quizData.negative_marks);
          currentStreak = 0;
        }
      });
      setScore(finalScore);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (!quizData) {
    return (
      <>
        <QuizHeader />
        <Fetch onDataReceived={handleDataReceived} />
      </>
    );
  }

  return (
    <>
      <QuizHeader />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {!quizStarted ? (
          <Start quizData={quizData} onStart={startQuiz} />
        ) : showResults ? (
          <Results 
            score={score} 
            totalQuestions={quizData.questions.length} 
            answers={userAnswers}
            questions={quizData.questions}
            onRestart={startQuiz}
          />
        ) : (
          <div>
            {streak > 1 && (
              <div className="text-center mb-4 text-blue-500 font-bold">
                🔥 {streak} Streak! ({(streak * 0.5 + 1).toFixed(1)}x points)
              </div>
            )}
            <Question
              question={quizData.questions[currentQuestion]}
              onAnswer={handleAnswer}
              currentNumber={currentQuestion + 1}
              total={quizData.questions.length}
              onPrevious={handlePrevious}
              previousAnswer={userAnswers[currentQuestion]?.selectedOption}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;