import type { Question, QuizResult } from '../types';

export function calculateScore(
  questions: Question[],
  userAnswers: Record<string, string>,
  mode: 'normal' | 'hard' | 'expert'
): QuizResult {
  let totalCorrect = 0;
  let totalIncorrect = 0;
  let roadSignCorrect = 0;
  let roadSignTotal = 0;

  const missedQuestions: Question[] = [];
  const weakTopicsMap: Record<string, number> = {};

  questions.forEach(q => {
    if (q.isRoadSign) {
      roadSignTotal++;
    }

    const userAnswer = userAnswers[q.id];
    if (userAnswer === q.correctAnswer) {
      totalCorrect++;
      if (q.isRoadSign) {
        roadSignCorrect++;
      }
    } else {
      totalIncorrect++;
      missedQuestions.push(q);
      weakTopicsMap[q.topic] = (weakTopicsMap[q.topic] || 0) + 1;
    }
  });

  const scorePercentage = Math.round((totalCorrect / questions.length) * 100);

  let passed = false;

  if (mode === 'normal') {
    // 20 questions, 14 total correct, 2 road signs correct
    passed = totalCorrect >= 14 && roadSignCorrect >= 2;
  } else if (mode === 'hard') {
    // 20 questions, 19 total correct, 4 road signs correct
    passed = totalCorrect >= 19 && roadSignCorrect >= 4;
  } else if (mode === 'expert') {
    // 50 questions, 49 total correct, 90% road signs correct
    const roadSignReq = Math.ceil(roadSignTotal * 0.9);
    passed = totalCorrect >= 49 && roadSignCorrect >= roadSignReq;
  }

  // Sort weak topics by most missed
  const weakTopics = Object.keys(weakTopicsMap).sort(
    (a, b) => weakTopicsMap[b] - weakTopicsMap[a]
  );

  return {
    passed,
    totalCorrect,
    totalIncorrect,
    scorePercentage,
    roadSignCorrect,
    roadSignTotal,
    mode,
    missedQuestions,
    userAnswers,
    weakTopics,
  };
}

export function canStillPass(
  _questionsLeft: number,
  currentIncorrect: number,
  currentRoadSignIncorrect: number,
  mode: 'normal' | 'hard' | 'expert',
  roadSignTotal: number
): boolean {
  if (mode === 'normal') {
    // total 20, max incorrect is 6
    if (currentIncorrect > 6) return false;
    // road signs total 4, max incorrect is 2
    if (currentRoadSignIncorrect > 2) return false;
  } else if (mode === 'hard') {
    // total 20, max incorrect is 1
    if (currentIncorrect > 1) return false;
    // road signs total 4, max incorrect is 0
    if (currentRoadSignIncorrect > 0) return false;
  } else if (mode === 'expert') {
    // total 50, max incorrect is 1
    if (currentIncorrect > 1) return false;
    // road signs 90% required
    const maxRoadSignIncorrect = Math.floor(roadSignTotal * 0.1);
    if (currentRoadSignIncorrect > maxRoadSignIncorrect) return false;
  }
  return true;
}
