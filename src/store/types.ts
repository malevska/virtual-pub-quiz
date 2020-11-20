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
  resetQuiz: (qIndex: number) => void;
  startQuiz: (qIndex: number) => void;
  addCategory: (qIndex: number, title: string) => void;
  addQuestion: (qIndex: number, cIndex: number, quest: Question) => void;
  editQuestion: (
    qIndex: number,
    cIndex: number,
    quIndex: number,
    q: Question
  ) => void;
  changeQuizTitle: (qIndex: number, title: string) => void;
  changeCategoryTitle: (qIndex: number, cIndex: number, title: string) => void;
  addPlayers: (qIndex: number, playersList: string[]) => void;
  editPlayers: (qIndex: number, players: string[]) => void;
  changePlayerName: (qIndex: number, pIndex: number, name: string) => void;
};
