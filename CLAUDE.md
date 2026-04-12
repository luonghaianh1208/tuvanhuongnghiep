# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vietnamese career guidance web application targeting high school students. Features 3 psychology tests (Holland RIASEC, MBTI, DISC), AI-powered analysis via Google Gemini API, Firebase/Firestore for admin analytics, and localStorage for user-side persistence. Built with React + Vite + Tailwind CSS, deployed on Netlify.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:3000
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build
npm run test         # Run tests once (vitest)
npm run test:watch   # Run tests in watch mode
```

## Environment Setup

Copy `.env.example` to `.env` and fill in values:

- `VITE_GEMINI_API_KEY` - Google Gemini API key (get free at https://aistudio.google.com). Also set in Netlify env vars for the serverless proxy.
- `VITE_FIREBASE_*` - Firebase project config (API key, auth domain, project ID, storage bucket, messaging sender ID, app ID)
- `VITE_ADMIN_EMAIL` - Google account email authorized for admin dashboard access

## Architecture

### Two-Layer Data Model

**User-facing (localStorage):** All quiz answers, results, and history are stored client-side via `src/lib/storage.js`. Keys: `career_test_history` (completed results array), `career_test_partial_{testType}` (in-progress answers for resume), `career_test_user_info` (user profile from onboarding modal).

**Admin-facing (Firebase Firestore):** User submissions are also pushed to Firestore via `src/lib/firestore-submit.js` for admin analytics. Admin dashboard at `/admin` requires Google Auth matching `VITE_ADMIN_EMAIL`, enforced by `src/lib/AdminAuthContext.jsx` + `src/components/AdminRoute.jsx`.

### Gemini API Flow

The frontend (`src/lib/gemini-api.js`) does NOT call Gemini directly. It posts to `/.netlify/functions/api-proxy`, a Netlify Function (`netlify/functions/api-proxy.js`) that appends the API key server-side and proxies to `gemini-2.0-flash:generateContent`. Client-side caches responses in `sessionStorage` with a hash key.

### Test Flow

1. User fills onboarding modal (`UserInfoModal`) on first visit (name, school, career interests)
2. Selects tests on `/select-test`
3. Quiz page (`/quiz/:testTypes`) renders questions one at a time with progress bar
4. Scoring in `src/lib/scoring.js`: Holland sums per RIASEC group (max 35 each), MBTI counts binary E/I S/N T/F J/P choices, DISC sums per group
5. `getCombinedResults()` aggregates career votes weighted: Holland 2x, MBTI 1x, DISC 1x
6. Results displayed on `/result` (passed via `location.state`), with optional AI deep analysis and 5-turn chat

### Routing

- `/` - Landing page
- `/select-test` - Choose which tests to take
- `/quiz/:testTypes` - Take quiz (e.g., `/quiz/holland,mbti,disc`)
- `/result` - View results (receives data via `location.state`)
- `/history` - Past results
- `/privacy-policy` - Privacy policy
- `/admin` - Admin dashboard (Google Auth protected)

Pages are lazy-loaded via `React.lazy()` in `App.jsx`.

### Code Splitting

`vite.config.js` defines manual chunks: `vendor` (react/react-dom/react-router-dom), `recharts`, `career-data` (careers.js + mbti-profiles.js).

## Key Conventions

- All user-facing text is in Vietnamese
- Career AI outlook values: "Phat trien manh" (thrives with AI), "On dinh" (stable), "Rui ro cao" (high AI replacement risk)
- No backend auth for users - admin-only auth via Firebase Google sign-in
- `src/data/` files are static data (questions, careers, MBTI profiles) - treat as configuration

## Deployment

Netlify with `netlify.toml`: builds with `npm run build`, publishes `dist/`, SPA redirect `/*` to `/index.html`. Set all `VITE_*` env vars in Netlify dashboard. The Gemini API key must be set both as a Netlify env var (for the serverless function) and can optionally be in `.env` for local dev.
