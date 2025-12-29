"use client";

import { QuizProps } from "@/lib/constants";
import React, { useState } from "react";
import { Button } from "./ui/button";


const QuizComponent: React.FC<QuizProps> = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [allAnswers, setAllAnswers] = useState<Record<number, number[]>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  // Stats
  const totalQuestions = questions.length;
  const attemptedCount = Object.keys(allAnswers).length;

  const handleToggle = (index: number) => {
    setSelectedOptions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleNext = () => {
    // Save current selection to the answers record
    const updatedAnswers = { ...allAnswers, [currentQuestion.id]: selectedOptions };
    setAllAnswers(updatedAnswers);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      // Load existing answers if user goes back/forth, or reset to empty
      setSelectedOptions(updatedAnswers[questions[currentIndex + 1].id] || []);
    } else {
      setIsFinished(true);
    }
  };

  const calculateFinalScore = () => {
    return questions.reduce((score, q) => {
      const userChoices = allAnswers[q.id] || [];
      const isCorrect =
        userChoices.length === q.correctAnswers.length &&
        userChoices.every(val => q.correctAnswers.includes(val));
      return isCorrect ? score + 1 : score;
    }, 0);
  };

  const restart = () => {
    setCurrentIndex(0)
    setSelectedOptions([])
    setAllAnswers({})
    setIsFinished(false)
  }

  if (isFinished) {
    const finalScore = calculateFinalScore();
    return (
      <div className="max-w-md mx-auto mt-10 p-8 border rounded-2xl shadow-sm text-center">
        <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
        <div className="my-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Attempted: <strong>{attemptedCount} / {totalQuestions}</strong></p>
          <p className="text-4xl font-bold text-blue-600 mt-2">{finalScore} / {totalQuestions}</p>
        </div>
        <Button
          onClick={restart}
          className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full md:w-md mx-auto mt-10 p-6 border rounded-2xl shadow-sm">
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{attemptedCount} Attempted</span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <h5 className="font-bold mb-4 text-justify">{currentQuestion.text}</h5>

      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, idx) => (
          <Button
            key={idx}
            onClick={() => handleToggle(idx)}
            className={`bg-transparent hover:bg-blue-200 w-full text-left p-2 rounded-xl border-2 transition-all ${selectedOptions.includes(idx)
              ? "border-blue-500 bg-blue-50"
              : "border-gray-100 hover:border-gray-300"
              }`}
          >
            <div className="flex w-full items-center">
              <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${selectedOptions.includes(idx) ? "bg-blue-500 border-blue-500" : "border-gray-400"}`}>
                {selectedOptions.includes(idx) && <span className="text-white text-xs">✓</span>}
              </div>
              <span className={`${option.length > 50 ? "text-wrap text-[10px]" : ""} ${selectedOptions.includes(idx) ? "text-blue-900 font-medium" : "text-gray-700"}`}>
                {option}
              </span>
            </div>
          </Button>
        ))}
      </div>

      <Button
        onClick={handleNext}
        className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        {currentIndex === totalQuestions - 1 ? "Submit Results" : "Next Question"}
      </Button>
    </div>
  );
}

export default QuizComponent