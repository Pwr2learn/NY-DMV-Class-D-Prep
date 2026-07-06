# NY DMV Class D Prep

A bilingual (English and Spanish) web application designed to help users prepare for the New York DMV Class D learner permit test. It features topic-based lessons, practice questions, and realistic mock tests grounded strictly in the official NY DMV manuals.

## Core Features
- **Bilingual Interface:** Full app toggle between English and Spanish.
- **Accessibility:** Light/Dark mode and font-size controls.
- **Learn Mode:** Study topics directly extracted from the manual.
- **Practice Mode:** Topic-specific practice with explanations.
- **Mock Tests:** Normal (DMV-style), Hard, and Expert modes simulating the real test rules.
- **Progress Tracking:** LocalStorage-based tracking of performance, weak areas, and test readiness.

## Project Structure
- `/src/components`: UI components (LanguageSelector, ThemeToggle, QuizCard, etc.)
- `/src/pages`: Main application views.
- `/src/lib`: Core logic (QuizEngine, Scoring, Progress).
- `/src/content`: Source of truth for questions and chapters (JSON).
- `/docs/NY_DMV_Manual`: Official PDFs serving as the source of truth for all content.

## How to Run Locally
1. `npm install`
2. `npm run dev`

## How to Build
1. `npm run build`

## Known Limitations
- Progress is currently saved locally (LocalStorage) and not synced across devices.
- The question bank requires ongoing manual expansion from the PDF manuals.

## Source of Truth Rule
Do not invent DMV rules, test questions, explanations, or legal requirements. Every lesson, practice question, and explanation must be grounded only in the content available inside the `/docs/NY_DMV_Manual` folder.
