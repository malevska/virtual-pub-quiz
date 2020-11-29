import { Context } from "react";

export interface Quiz {
  title: string;
  isPlaying: boolean;
  players: string[];
  categories: Category[];
}

export interface Category {
  title: string;
  questions: Question[];
}

export interface Question {
  text: string;
  answer: string;
  embeds: string;
  points: number;

  answererIndex?: number;
  awardedPoints?: number;
}

export type AppMethods = {
  addQuiz: (title: string) => void;
  removeQuiz: (qIndex: number) => void;
  replaceQuiz: (index: number, quiz: Quiz) => void;
  startQuiz: (qIndex: number, isPlaying: boolean) => void;
  addCategory: (qIndex: number, title: string) => void;
  editCategory: (qIndex: number, cIndex: number, title: string) => void;
  addQuestion: (qIndex: number, cIndex: number, quest: Question) => void;
  editQuestion: (
    qIndex: number,
    cIndex: number,
    quIndex: number,
    q: Question
  ) => void;
  setPlayers: (qIndex: number, playersList: string[]) => void;
};
