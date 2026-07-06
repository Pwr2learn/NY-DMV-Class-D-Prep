# Question Bank Guide

This guide explains the schema, generation rules, and review process for the NY DMV Class D Prep question bank.

## 1. Source of Truth
- All questions MUST be based on the official NY DMV manuals found in the `docs/NY_DMV_Manual/` directory.
- Do not invent rules, questions, or explanations not found in the manual.

## 2. Question Schema
```json
{
  "id": "en_ch4_001",
  "language": "en",
  "chapter": 4,
  "topic": "road_signs",
  "difficulty": "normal",
  "isRoadSign": true,
  "status": "approved",
  "question": "What does a red octagon sign mean?",
  "choices": ["Stop", "Yield", "Do not enter", "Railroad crossing"],
  "correctAnswer": "Stop",
  "explanation": "A red octagon sign means stop completely before proceeding.",
  "source": "NY DMV Manual, Chapter 4"
}
```
*Note: The `language` field must be either `en` or `es`. Both languages should be aligned by concept.*

## 3. Review Process
- When generating questions, mark them as `needs_review` if uncertain.
- Only questions with `status: "approved"` should appear in user-facing tests.
- Ensure that Spanish translations are natural and accurate.
