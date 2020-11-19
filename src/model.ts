export interface AppModel {
  quizzes: Quiz[];
}

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
