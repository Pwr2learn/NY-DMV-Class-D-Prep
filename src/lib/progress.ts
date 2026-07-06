import type { UserProgress, QuizResult } from '../types';

const PROGRESS_KEY = 'ny_dmv_progress';

export const defaultProgress: UserProgress = {
  totalQuestionsAnswered: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  practiceSessionsCompleted: 0,
  mockTestsCompleted: 0,
  bestMockTestScore: 0,
  lastMockTestScore: 0,
  normalModePassHistory: [],
  hardModePassHistory: [],
  expertModePassHistory: [],
  roadSignAccuracy: 0,
  weakTopics: {},
  questionsMissed: {},
};

export function loadProgress(): UserProgress {
  try {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) {
      return { ...defaultProgress, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load progress', e);
  }
  return defaultProgress;
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
}

export function updateProgressWithResult(progress: UserProgress, result: QuizResult): UserProgress {
  const newProgress = { ...progress };

  newProgress.totalQuestionsAnswered += (result.totalCorrect + result.totalIncorrect);
  newProgress.totalCorrect += result.totalCorrect;
  newProgress.totalIncorrect += result.totalIncorrect;
  newProgress.mockTestsCompleted += 1;
  newProgress.lastMockTestScore = result.scorePercentage;
  
  if (result.scorePercentage > newProgress.bestMockTestScore) {
    newProgress.bestMockTestScore = result.scorePercentage;
  }

  // Update history keeping last 5
  if (result.mode === 'normal') {
    newProgress.normalModePassHistory = [...newProgress.normalModePassHistory, result.passed].slice(-5);
  } else if (result.mode === 'hard') {
    newProgress.hardModePassHistory = [...newProgress.hardModePassHistory, result.passed].slice(-5);
  } else if (result.mode === 'expert') {
    newProgress.expertModePassHistory = [...newProgress.expertModePassHistory, result.passed].slice(-5);
  }

  // Update missed topics
  result.missedQuestions.forEach(q => {
    newProgress.weakTopics[q.topic] = (newProgress.weakTopics[q.topic] || 0) + 1;
    newProgress.questionsMissed[q.id] = (newProgress.questionsMissed[q.id] || 0) + 1;
  });

  // Simplified road sign accuracy update
  // A true robust implementation would track total road signs seen vs correct over time,
  // but for now we update it as a moving average or just from this test if there were road signs.
  if (result.roadSignTotal > 0) {
      const currentTestAccuracy = (result.roadSignCorrect / result.roadSignTotal) * 100;
      if (newProgress.roadSignAccuracy === 0) {
          newProgress.roadSignAccuracy = currentTestAccuracy;
      } else {
          newProgress.roadSignAccuracy = (newProgress.roadSignAccuracy + currentTestAccuracy) / 2;
      }
  }

  return newProgress;
}

export function getReadinessLevel(progress: UserProgress): string {
  // Not Ready: user is below DMV passing level
  // Almost Ready: user passes sometimes but not consistently
  // DMV Ready: user passes 3 Normal / DMV mock tests in a row
  // Strong Ready: user passes Hard Mode
  // Expert Ready: user passes Expert Mode
  
  if (progress.expertModePassHistory.some(p => p)) return 'Expert Ready';
  if (progress.hardModePassHistory.some(p => p)) return 'Strong Ready';
  
  const normalHistory = progress.normalModePassHistory;
  if (normalHistory.length >= 3 && normalHistory.slice(-3).every(p => p)) {
    return 'DMV Ready';
  }

  if (normalHistory.some(p => p)) return 'Almost Ready';
  
  return 'Not Ready';
}
