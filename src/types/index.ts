export type Language = 'en' | 'es';
export type Theme = 'light' | 'dark';
export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface Question {
  id: string;
  language: Language;
  chapter: number;
  topic: string;
  difficulty: 'normal' | 'hard' | 'expert';
  isRoadSign: boolean;
  status: 'approved' | 'needs_review';
  question: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
  source: string;
}

export interface Chapter {
  id: string;
  language: Language;
  number: number;
  title: string;
  summary: string;
  topics: string[];
}

export interface QuizResult {
  passed: boolean;
  totalCorrect: number;
  totalIncorrect: number;
  scorePercentage: number;
  roadSignCorrect: number;
  roadSignTotal: number;
  mode: 'normal' | 'hard' | 'expert';
  missedQuestions: Question[];
  userAnswers: Record<string, string>;
  weakTopics: string[];
}

export interface UserProgress {
  totalQuestionsAnswered: number;
  totalCorrect: number;
  totalIncorrect: number;
  practiceSessionsCompleted: number;
  mockTestsCompleted: number;
  bestMockTestScore: number;
  lastMockTestScore: number;
  normalModePassHistory: boolean[];
  hardModePassHistory: boolean[];
  expertModePassHistory: boolean[];
  roadSignAccuracy: number; // percentage
  weakTopics: Record<string, number>; // topic -> mistakes count
  questionsMissed: Record<string, number>; // questionId -> mistakes count
}
