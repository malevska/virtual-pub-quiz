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

  const startQuiz = (index: number, isPlaying: boolean) => {
    setQuizzes(
      produce(quizzes, (quizzes) => {
        quizzes[index].isPlaying = true;
      })
    );
  };

  const addCategory = (qIndex: number, title: string) => {
    setQuizzes(
      produce(quizzes, (quizzes) => {
        quizzes[qIndex].categories.push({ title, id: uuid(), questions: [] });
      })
    );
  };

  const editCategory = (qIndex: number, cIndex: number, title: string) =>
    setQuizzes(
      produce(quizzes, (quizzes) => {
        quizzes[qIndex].categories[cIndex].title = title;
      })
    );

  const removeCategory = (qIndex: number, cIndex: number) => {
    setQuizzes(
      produce(quizzes, (quizzes) => {
        quizzes[qIndex].categories.splice(cIndex, 1);
      })
    );
  };

  const addQuestion = (qIndex: number, cIndex: number, quest: Question) => {
    setQuizzes(
      produce(quizzes, (quizzes) => {
        quizzes[qIndex].categories[cIndex].questions.push(quest);
      })
    );
  };

  const editQuestion = (
    qIndex: number,
    cIndex: number,
    questIndex: number,
    newQuestion: Question,
    answerer?: number,
    awardedPoints?: number
  ) => {
    setQuizzes(
      produce(quizzes, (quizzes) => {
        quizzes[qIndex].categories[cIndex].questions.splice(
          questIndex,
          1,
          newQuestion
        );

        quizzes[qIndex].categories[cIndex].questions[
          questIndex
        ].answererIndex = answerer;

        quizzes[qIndex].categories[cIndex].questions[
          questIndex
        ].awardedPoints = awardedPoints;
      })
    );
  };

  const removeQuestion = (
    qIndex: number,
    cIndex: number,
    questIndex: number
  ) => {
    setQuizzes(
      produce(quizzes, (quizzes) => {
        quizzes[qIndex].categories[cIndex].questions.splice(questIndex, 1);
      })
    );
  };

  const setPlayers = (qIndex: number, playersList: string[]) => {
    setQuizzes(
      produce(quizzes, (quizzes) => {
        quizzes[qIndex].players = playersList;
      })
    );
  };

  return [
    quizzes,
    {
      addQuiz,
      removeQuiz,
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
