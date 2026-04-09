# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vietnamese career guidance web application with 3 psychology tests (Holland RIASEC, MBTI, DISC), AI-powered analysis using Google Gemini API, and localStorage persistence. Built with React + Vite + Tailwind CSS.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:3000
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build
```

## Environment Setup

Create `.env` file (copy from `.env.example`):
```
VITE_GEMINI_API_KEY=your_gemini_api_key
```
Get free API key at: https://aistudio.google.com

## Architecture

### Test Flow
1. User selects tests on `/select-test` page
2. Quiz page (`/quiz/:testTypes`) renders questions one at a time
3. Results are calculated in `src/lib/scoring.js` and displayed on `/result`
4. AI analysis calls `src/lib/gemini-api.js` which invokes Gemini 2.5 Flash API

### Scoring Logic (src/lib/scoring.js)
- `calculateHolland(answers)` - Sums scores per group (R/I/A/S/E/C), max 35 per group, returns top 3-letter code and matched careers
- `calculateMBTI(answers)` - Counts E/I, S/N, T/F, J/P selections, determines 4-letter type, maps to profile in `mbti-profiles.js`
- `calculateDISC(answers)` - Sums D/I/S/C scores, determines dominant + secondary style, returns career recommendations
- `getCombinedResults(results)` - Aggregates career votes from all completed tests, weighted by Holland (2x), MBTI (1x), DISC (1x)

### Data Files
- `src/data/questions/holland-questions.js` - 42 questions, 7 per group, scale 1-5
- `src/data/questions/mbti-questions.js` - 60 questions, 15 per dimension (EI/SN/TF/JP), binary choice
- `src/data/questions/disc-questions.js` - 28 questions, 7 per group, scale 1-5
- `src/data/careers.js` - 55 careers with Holland codes, MBTI types, DISC styles, salary ranges, AI outlook
- `src/data/mbti-profiles.js` - 16 personality profiles with descriptions, strengths, careers

### Storage (src/lib/storage.js)
- `career_test_history` key stores array of completed test results
- `career_test_partial_{testType}` keys store in-progress answers for resume capability
- No backend - all data in browser localStorage

### Routing
- `/` - HomePage (landing)
- `/select-test` - Choose tests
- `/quiz/:testTypes` - Take quiz (e.g., `/quiz/holland,mbti,disc`)
- `/result` - View results (receives data via location.state)
- `/history` - View past results

### Career AI Outlook
Each career in `careers.js` has an `aiOutlook` field:
- "Phát triển mạnh" - Will thrive with AI
- "Ổn định" - Stable, less affected by AI
- "Rủi ro cao" - High risk of AI replacement

## Netlify Deployment

File `netlify.toml` configures:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback redirects for all routes to `index.html`

Set `VITE_GEMINI_API_KEY` environment variable in Netlify dashboard under Site settings → Environment variables.

## Tech Stack
- React 18 + Vite 5
- Tailwind CSS 3.4
- Recharts for radar/bar charts
- React Router DOM 6
- Google Gemini 2.5 Flash API