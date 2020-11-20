import { Question, Quiz } from "./types";
import { useState } from "react";

/**
 * Our own custom hook for handling quiz state
 */
export const useQuizzes = (initial: Quiz[]) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>(initial);

  const addQuiz = (title: string) => {
    setQuizzes([
      ...quizzes,
      { title, isPlaying: false, players: [], categories: [] },
    ]);
  };

  const removeQuiz = (index: number) => {
    setQuizzes([...quizzes.slice(0, index), ...quizzes.slice(index + 1)]);
  };

  const replaceQuiz = (index: number, quiz: Quiz) => {
    setQuizzes([...quizzes.slice(0, index), quiz, ...quizzes.slice(index + 1)]);
  };

  const resetQuiz = (index: number) => {
    replaceQuiz(index, { ...quizzes[index], isPlaying: false });
  };

  const startQuiz = (index: number) => {
    replaceQuiz(index, { ...quizzes[index], isPlaying: true });
  };

  const addCategory = (qIndex: number, title: string) => {
    const quiz = quizzes[qIndex];
    replaceQuiz(qIndex, {
      ...quiz,
      categories: [...quiz.categories, { title, questions: [] }],
    });
  };

  const addQuestion = (qIndex: number, cIndex: number, quest: Question) => {
    const quiz = quizzes[qIndex];
    const cat = quizzes[qIndex].categories[cIndex];
    replaceQuiz(qIndex, {
      ...quiz,
      categories: [
        ...quiz.categories.slice(0, cIndex),
        { ...cat, questions: [...cat.questions, quest] },
        ...quiz.categories.slice(cIndex + 1),
      ],
    });
  };

  const editQuestion = (
    qIndex: number,
    cIndex: number,
    questIndex: number,
    newQuestion: Question
  ) => {
    const quiz = quizzes[qIndex];
    const cat = quizzes[qIndex].categories[cIndex];
    replaceQuiz(qIndex, {
      ...quiz,
      categories: [
        ...quiz.categories.slice(0, cIndex),
        {
          ...cat,
          questions: [
            ...cat.questions.slice(0, questIndex),
            newQuestion,
            ...cat.questions.slice(questIndex + 1),
          ],
        },
        ...quiz.categories.slice(cIndex + 1),
      ],
    });
  };

  const changeQuizTitle = (qIndex: number, title: string) => {
    replaceQuiz(qIndex, { ...quizzes[qIndex], title });
  };

  const changeCategoryTitle = (
    qIndex: number,
    cIndex: number,
    title: string
  ) => {
    const quiz = quizzes[qIndex];
    const cat = quiz.categories[cIndex];
    replaceQuiz(qIndex, {
      ...quiz,
      categories: [
        ...quiz.categories.slice(0, cIndex),
        { ...cat, title },
        ...quiz.categories.slice(cIndex + 1),
      ],
    });
  };

  const addPlayers = (qIndex: number, playersList: string[]) => {
    replaceQuiz(qIndex, {
      ...quizzes[qIndex],
      players: [...quizzes[qIndex].players, ...playersList],
    });
  };

  // Should be called "set players"
  const editPlayers = (qIndex: number, players: string[]) => {
    replaceQuiz(qIndex, { ...quizzes[qIndex], players });
  };

  // should be called setPlayer since the name is all the data about the player
  const changePlayerName = (qIndex: number, pIndex: number, name: string) => {
    replaceQuiz(qIndex, {
      ...quizzes[qIndex],
      players: [
        ...quizzes[qIndex].players.slice(0, pIndex),
        name,
        ...quizzes[qIndex].players.slice(pIndex + 1),
      ],
    });
  };

  return [
    quizzes,
    {
      addQuiz,
      removeQuiz,
      resetQuiz,
      startQuiz,
      addCategory,
      addQuestion,
      editQuestion,
      addPlayers,
      editPlayers,
      changeQuizTitle,
      changeCategoryTitle,
      changePlayerName,
    },
  ];
};
