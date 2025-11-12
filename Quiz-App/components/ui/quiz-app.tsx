"use client"; // Enables client-side rendering for this component

import { useState, useEffect } from "react"; 
import { Button } from "@/components/ui/button"; 
import ClipLoader from "react-spinners/ClipLoader";

// Define the Answer type
type Answer = {
  text: string;
  isCorrect: boolean;
};

// Define the Question type
type Question = {
  question: string;
  answers: Answer[];
};

// Define the QuizState type
type QuizState = {
  currentQuestion: number;
  score: number;
  showResults: boolean;
  questions: Question[];
  isLoading: boolean;
};

// Define the props for QuizApp
type QuizAppProps = {
  category: number;
};

export default function QuizApp({ category }: QuizAppProps): JSX.Element {
  // State to manage the quiz
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    showResults: false,
    questions: [],
    isLoading: true,
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      setState((prevState) => ({ ...prevState, isLoading: true })); // Set loading state

      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&type=multiple&category=${category}`
        );
        const data = await response.json();

        // Define a more specific type for the API response
        const questions: Question[] = data.results.map((item: {
          question: string;
          correct_answer: string;
          incorrect_answers: string[];
        }) => {
          const incorrectAnswers = item.incorrect_answers.map((answer) => ({
            text: answer,
            isCorrect: false,
          }));
          const correctAnswer: Answer = {
            text: item.correct_answer,
            isCorrect: true,
          };
          return {
            question: item.question,
            answers: [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5),
          };
        });

        setState((prevState) => ({
          ...prevState,
          questions,
          isLoading: false,
        }));
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setState((prevState) => ({ ...prevState, isLoading: false })); // Stop loading on error
      }
    };

    if (category) {
      fetchQuestions();
    }
  }, [category]);

  // Show loading spinner if the questions are still loading
  if (state.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <ClipLoader />
        <p>Loading quiz questions, please wait...</p>
      </div>
    );
  }

  // Show message if no questions are available
  if (state.questions.length === 0) {
    return <div className="bg-black text-white">No questions available.</div>;
  }

  // Get the current question
  const currentQuestion = state.questions[state.currentQuestion];

  function resetQuiz(): void {
    setState({
      currentQuestion: 0,
      score: 0,
      showResults: false,
      questions: [], // Clear previous questions
      isLoading: true, // Set loading state when resetting
    });

    // Fetch new questions again after resetting
    const fetchQuestionsAgain = async () => {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&type=multiple&category=${category}`
        );
        const data = await response.json();
        
        const questions: Question[] = data.results.map((item: {
          question: string;
          correct_answer: string;
          incorrect_answers: string[];
        }) => {
          const incorrectAnswers = item.incorrect_answers.map((answer) => ({
            text: answer,
            isCorrect: false,
          }));
          const correctAnswer: Answer = {
            text: item.correct_answer,
            isCorrect: true,
          };
          return {
            question: item.question,
            answers: [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5),
          };
        });

        setState((prevState) => ({
          ...prevState,
          questions,
          isLoading: false,
        }));
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setState((prevState) => ({ ...prevState, isLoading: false }));
      }
    };

    fetchQuestionsAgain(); // Call fetch again on reset
  }

  function handleAnswerClick(isCorrect: boolean): void {
    if (isCorrect) {
      setState((prevState) => ({ ...prevState, score: prevState.score + 1 }));
    }
    const nextQuestion = state.currentQuestion + 1;
    if (nextQuestion < state.questions.length) {
      setState((prevState) => ({ ...prevState, currentQuestion: nextQuestion }));
    } else {
      setState((prevState) => ({ ...prevState, showResults: true }));
    }
  }

  // JSX return statement rendering the Quiz UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-black">
      {state.showResults ? (
        <div className="bg-[#EED6D3] p-16 rounded-xl shadow-2xl w-full max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-8">Results</h2>
          <p className="text-2xl mb-8">
            You scored {state.score} out of {state.questions.length}
          </p>
          <Button onClick={resetQuiz} className="w-full border border-[#AA0000] text-white bg-[#AA0000] hover:bg-[#960018] transition duration-300 text-lg py-4">
            Try Again
          </Button>
        </div>
      ) : (
        <div className="bg-[#EED6D3] p-10 rounded-xl shadow-lg w-full max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">
            Question {state.currentQuestion + 1}/{state.questions.length}
          </h2>
          <p
            className="text-lg mb-6"
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          />
          <div className="grid gap-4">
            {currentQuestion.answers.map((answer, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerClick(answer.isCorrect)}
                className="w-full border border-[#AA0000] text-black bg-[#EED6D3] hover:bg-gray-300 transition duration-300 rounded-lg"
              >
                {answer.text}
              </Button>
            ))}
          </div>
          <div className="mt-6 text-right">
            <span className="text-muted-foreground">Score: {state.score}</span>
          </div>
        </div>
      )}
    </div>
  );
}
