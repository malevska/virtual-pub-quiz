import { Question, Quiz, AppMethods } from "./types";
import { useState, createContext } from "react";
import { produce } from "immer";
import { v4 as uuid } from "uuid";

/**
 * Our own custom hook for handling quiz state
 */
export const useQuizzes = (initial: Quiz[]) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>(initial);

  const addQuiz = (title: string) =>
    setQuizzes(
      produce(quizzes, (quizzes) => {
        quizzes.push({
          title,
          id: uuid(),
          isPlaying: false,
          players: [],
          categories: [],
        });
      })
    );

  const removeQuiz = (index: number) =>
    setQuizzes(
      produce(quizzes, (quizzes) => {
        quizzes.splice(index, 1);
      })
    );

  const replaceQuiz = (index: number, quiz: Quiz) => {
    setQuizzes([...quizzes.slice(0, index), quiz, ...quizzes.slice(index + 1)]);
  };

  const startQuiz = (index: number, isPlaying: boolean) => {
    replaceQuiz(index, { ...quizzes[index], isPlaying: isPlaying });
  };

  const addCategory = (qIndex: number, title: string) => {
    const quiz = quizzes[qIndex];
    replaceQuiz(qIndex, {
      ...quiz,
      categories: [...quiz.categories, { id: uuid(), title, questions: [] }],
    });
  };

  const editCategory = (qIndex: number, cIndex: number, title: string) =>
    setQuizzes(
      produce(quizzes, (quizzes) => {
        quizzes[qIndex].categories[cIndex].title = title;
      })
    );

  // const editCategory = (qIndex: number, cIndex: number, title: string) => {
  //   const quiz = quizzes[qIndex];
  //   const cat = quiz.categories[cIndex];
  //   setQuizzes([
  //     ...quizzes.slice(0, qIndex),
  //     {
  //       ...quiz,
  //       categories: [
  //         ...quiz.categories.slice(0, cIndex),
  //         { ...cat, title },
  //         ...quiz.categories.slice(cIndex + 1),
  //       ],
  //     },
  //     ...quizzes.slice(qIndex + 1),
  //   ]);
  // };

  const removeCategory = (qIndex: number, cIndex: number) => {
    const quiz = quizzes[qIndex];
    replaceQuiz(qIndex, {
      ...quiz,
      categories: [
        ...quiz.categories.slice(0, cIndex),
        ...quiz.categories.slice(cIndex + 1),
      ],
    });
  };

  const addQuestion = (qIndex: number, cIndex: number, quest: Question) => {
    const quiz = quizzes[qIndex];
    const cat = quizzes[qIndex].categories[cIndex];
    replaceQuiz(qIndex, {
      ...quiz,
      categories: [
        ...quiz.categories.slice(0, cIndex),
        { ...cat, questions: [...cat.questions, { ...quest, id: uuid() }] },
        ...quiz.categories.slice(cIndex + 1),
      ],
    });
  };

  const editQuestion = (
    qIndex: number,
    cIndex: number,
    questIndex: number,
    newQuestion: Question,
    answerer?: number,
    awardedPoints?: number
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
            {
              ...newQuestion,
              answererIndex: answerer,
              awardedPoints: awardedPoints,
            },
            ...cat.questions.slice(questIndex + 1),
          ],
        },
        ...quiz.categories.slice(cIndex + 1),
      ],
    });
  };

  const removeQuestion = (
    qIndex: number,
    cIndex: number,
    questIndex: number
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
            ...cat.questions.slice(questIndex + 1),
          ],
        },
        ...quiz.categories.slice(cIndex + 1),
      ],
    });
  };

  const setPlayers = (qIndex: number, playersList: string[]) => {
    replaceQuiz(qIndex, {
      ...quizzes[qIndex],
      players: [...playersList],
    });
  };

  return [
    quizzes,
    {
      addQuiz,
      removeQuiz,
      replaceQuiz,
      startQuiz,
      addCategory,
      editCategory,
      removeCategory,
      addQuestion,
      editQuestion,
      removeQuestion,
      setPlayers,
    },
  ] as [Quiz[], AppMethods];
};

/** Create an empty context which we will populate later */
export const MethodsContext = createContext<AppMethods>(null);
