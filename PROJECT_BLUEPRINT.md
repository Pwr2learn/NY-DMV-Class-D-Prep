A bilingual NY DMV Class D learning and testing app that teaches the manual, quizzes by topic, tracks weak areas, and simulates the real permit test in English or Spanish.

The current NY DMV Class D written test is 20 questions. To pass, the user must answer at least 14 out of 20 correctly, and they must also answer at least 2 of the 4 road-sign questions correctly. The DMV also says Chapters 4 through 11 of the manual contain the material tested for Class D, DJ, and E permits.

NY DMV also confirms Class D permit tests are available in multiple languages, including English and Spanish, so your bilingual app direction is valid.

1. Difficulty levels grounded to the real DMV test

Because the real DMV test is only 20 questions, some percentages do not work cleanly.

Mode	Questions	Passing Rule	Purpose
Normal / DMV Mode	20	14/20 correct + 2/4 road signs	Matches the real NY DMV requirement
Hard Mode	20	19/20 correct + 4/4 road signs	Harder than DMV, close to 95%
Expert Mode	50	49/50 correct + strong road-sign requirement	Allows true 98% standard
Final Readiness Mode	Mixed	Must pass 3 DMV simulations in a row	Best signal that user is ready

For the app, I would not call the hardest level “Difficult.” I would call it Expert Mode or Final Boss Mode because it feels more motivating.

2. App Blueprint
Project Name

NY DMV Class D Prep

Possible better names:

PermitReady NY
NY Permit Coach
DrivePrep NY
Class D Mastery NY

Core Purpose

The app helps users prepare for the New York DMV Class D learner permit test by teaching the official manual content, testing users by topic, tracking weak areas, and running realistic mock permit exams in English and Spanish.

The app must not only help users memorize answers. It must help them understand the rules, signs, safe driving concepts, and laws well enough to pass the real test.

Main User Flow
User opens the app.
User selects language: English or Spanish.
Entire app switches to that language.
User selects one of three paths:
Learn
Practice
Mock Test
User studies DMV manual content by chapter.
User answers practice questions.
App explains every answer.
App tracks weak topics.
User takes simulated DMV tests until ready.
3. Core Features
A. Language Selection

The app must support:

English
Spanish

When the user selects a language, the entire interface changes:

Navigation
Buttons
Instructions
Lessons
Questions
Answers
Explanations
Results page
Error messages
Help section

The app should save the selected language in local storage or user settings.

Recommended structure:

/locales
  en.json
  es.json

/content
  english/
    chapters.json
    questions.json
  spanish/
    chapters.json
    questions.json
B. Light / Dark Mode

Add a clear toggle:

Light Mode / Dark Mode

Requirements:

Save user preference.
Respect system preference by default.
Make sure contrast is strong enough for readability.
Test all quiz cards, buttons, answer states, and results screens in both modes.
C. Font Size Accessibility

Add a font-size control:

Small / Medium / Large / Extra Large

This is important because many users may have sight issues or may be studying on phones.

Requirements:

Text must reflow naturally.
Quiz cards should expand instead of cutting text.
Buttons should remain easy to tap.
No horizontal scrolling on mobile.
Minimum tappable button height: around 44px.
Use responsive layout for phone, tablet, and desktop.
4. Learning System
Learn Mode

This section teaches the DMV manual.

Use the manual folder:

NY_DMV_Manual/
  english_manual.pdf
  spanish_manual.pdf

The app should extract and organize content from the manuals into chapters.

Recommended chapters:

Chapter 4: Traffic Control
Chapter 5: Intersections and Turns
Chapter 6: Passing
Chapter 7: Parallel Parking
Chapter 8: Defensive Driving
Chapter 9: Alcohol and Other Drugs
Chapter 10: Special Driving Conditions
Chapter 11: Sharing the Road

These are the chapters NY DMV says are tested for Class D, DJ, and E written tests.

Each lesson should include:

Short explanation
Key rule
Example
Common mistake
Mini quiz
“Mark as reviewed” button
5. Practice System
Practice Mode

Users should be able to practice by topic:

Road signs
Traffic lights and signals
Right of way
Speed limits
Parking
Passing
Alcohol and drug laws
Defensive driving
Sharing the road
Special conditions
School buses
Emergency vehicles

Each question should include:

Question text
4 answer choices
Correct answer
Explanation
Manual chapter reference
Topic tag
Difficulty tag
Language
Road-sign flag: true/false

Example schema:

{
  "id": "en_ch4_001",
  "language": "en",
  "chapter": 4,
  "topic": "road_signs",
  "difficulty": "normal",
  "isRoadSign": true,
  "question": "What does a red octagon sign mean?",
  "choices": ["Stop", "Yield", "Do not enter", "Railroad crossing"],
  "correctAnswer": "Stop",
  "explanation": "A red octagon sign means stop completely before proceeding.",
  "source": "NY DMV Manual, Chapter 4"
}
6. Mock Test System
DMV Simulation Mode

This should match the real NY DMV format:

20 questions total
4 road-sign questions
16 general knowledge questions
Passing score: 14/20
Road-sign requirement: 2/4

The test should fail the user if they score 14/20 but get fewer than 2 road-sign questions correct.

Result logic:

Pass if:
totalCorrect >= 14
AND
roadSignCorrect >= 2
Hard Mode

Suggested rule:

20 questions
Must get 19/20 correct
Must get 4/4 road signs correct

Why: 19/20 equals 95%.

Expert Mode

Suggested rule:

50 questions
Must get 49/50 correct
Must correctly answer at least 90% of road-sign questions

Why: 49/50 equals 98%.

7. Progress Tracking

The app should track:

Total questions answered
Correct answer rate
Weakest chapters
Weakest topics
Road-sign performance
Mock test attempts
Best score
Last score
Current readiness level

Recommended readiness labels:

Readiness Level	Meaning
Not Ready	User is below DMV passing level
Almost Ready	User passes sometimes but not consistently
DMV Ready	User passed 3 normal simulations in a row
Strong Ready	User passed Hard Mode
Expert Ready	User passed Expert Mode
8. Smart Review System

The app should not just repeat random questions.

It should prioritize:

Questions the user got wrong.
Topics with low scores.
Road signs.
Questions not seen recently.
Harder versions of mastered questions.

This makes the app a real learning system, not just a quiz app.

9. Admin / Content Generation System

You need a way to create and maintain questions from the manuals.

Recommended content pipeline:

Read English and Spanish manuals from NY_DMV_Manual.
Extract chapters 4–11.
Create chapter summaries.
Generate question bank.
Validate answers against the manual.
Tag each question by chapter and topic.
Store questions in JSON or database.
Add review status: approved / needs review.

For MVP, use JSON files first. Later, move to Supabase or PostgreSQL.

10. Recommended Tech Stack

For a clean MVP:

Frontend: Next.js or React + Vite
Styling: Tailwind CSS
Language system: i18next or custom JSON locale files
Storage MVP: LocalStorage + JSON files
Future database: Supabase
Deployment: Vercel

Simple MVP structure:

src/
  app/
  components/
    LanguageSelector.tsx
    ThemeToggle.tsx
    FontSizeControl.tsx
    QuizCard.tsx
    LessonCard.tsx
    ResultsScreen.tsx
  content/
    en/
      chapters.json
      questions.json
    es/
      chapters.json
      questions.json
  lib/
    quizEngine.ts
    scoring.ts
    progress.ts
    i18n.ts
  styles/
11. Pages Needed
Home Page

Purpose: explain the app.

Sections:

What this app does
Choose language
Start learning
Continue progress
Take mock test
Accessibility controls
Learn Page

Shows DMV chapters and lessons.

Practice Page

Lets users practice by topic.

Mock Test Page

Runs real DMV-style simulation.

Results Page

Shows:

Pass/fail
Total score
Road-sign score
Weak topics
Recommended next steps
Progress Page

Shows performance history.

Help Page

Explains:

How to use the app
What Normal, Hard, and Expert modes mean
How the DMV test works
How to change language
How to use dark mode
How to increase font size
12. MVP Build Order

Build it in this order:

App layout and routing
Language selector
Light/dark mode
Font size control
Static English and Spanish UI text
Manual content structure
Question schema
Quiz engine
DMV scoring logic
Practice mode
Mock test mode
Results screen
Progress tracking
Weak-area review
Help page
Mobile/tablet/desktop polish