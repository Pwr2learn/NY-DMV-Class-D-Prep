import type { Question } from '../types';

/**
 * Shuffles an array in place using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Generates a mock test based on the rules for Normal, Hard, or Expert modes.
 */
export function generateMockTest(
  allQuestions: Question[],
  mode: 'normal' | 'hard' | 'expert'
): Question[] {
  // Only use approved questions
  const approved = allQuestions.filter(q => q.status === 'approved');
  
  const roadSigns = approved.filter(q => q.isRoadSign);
  const general = approved.filter(q => !q.isRoadSign);

  let roadSignCount = 0;
  let generalCount = 0;

  if (mode === 'normal' || mode === 'hard') {
    roadSignCount = 4;
    generalCount = 16;
  } else if (mode === 'expert') {
    roadSignCount = 10; // example: 10 road signs, 40 general for expert
    generalCount = 40;
  }

  // Fallback if not enough questions are available (e.g., MVP seed)
  roadSignCount = Math.min(roadSignCount, roadSigns.length);
  generalCount = Math.min(generalCount, general.length);

  const selectedRoadSigns = shuffleArray(roadSigns).slice(0, roadSignCount);
  const selectedGeneral = shuffleArray(general).slice(0, generalCount);

  // Combine and shuffle final test
  return shuffleArray([...selectedRoadSigns, ...selectedGeneral]);
}
