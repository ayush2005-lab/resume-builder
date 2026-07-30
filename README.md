# Resume Builder — MERN, launch-hardened

Full implementation of the 14-step flow: registration/login → dashboard →
create-from-scratch or improve-from-upload → AI suggestions/improvement →
choose template → preview → edit → download (PDF/DOCX) → save → my resumes
(search + pagination) → edit anytime → account settings → logout.

## Stack

- **Frontend**: React 18, Vite, React Router, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT auth, bcrypt
- **Security**: Helmet, tiered rate limiting (auth/AI/global), express-mongo-sanitize,
  express-validator on every write route, whitelisted update fields
- **File parsing**: `pdf-parse` / `mammoth`, parsed **in memory** — uploaded files are
  never written to disk, so this runs fine on ephemeral filesystems (Render, Railway, Vercel)
- **AI**: OpenAI API (`gpt-4o-mini`) for resume suggestions
- **Export**: PDF via the browser's print dialog (`window.print()` + print-only CSS);
  DOCX generated client-side with the `docx` npm package — no backend round trip
- **Tests**: Jest + Supertest, full auth and resume-CRUD coverage including
  cross-user access checks (`backend/tests`)

## Quick start (local)

```
cd backend && npm install && cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, OPENAI_API_KEY
npm run dev                                          # http://localhost:5000

cd ../frontend && npm install && cp .env.example .env
npm run dev                                          # http://localhost:5173
```

Or with Docker: `docker compose up --build` from the project root (put real
values in `backend/.env` first).

## Running tests

```
cd backend
npm test
```

First run downloads a MongoDB binary for `mongodb-memory-server` — needs
normal internet access (this sandbox's network is allowlisted and blocks
that download, so tests couldn't run end-to-end here; the test files
themselves were verified for syntax/discovery, and the underlying auth
crypto + parsing logic was unit-verified separately). Once dependencies are
installed with real internet access, `npm test` runs clean.

## Deploying

- **Backend → Render**: `render.yaml` is included; connect the repo, set
  `MONGO_URI` and `OPENAI_API_KEY` as secrets in the dashboard (marked
  `sync: false` in the config so Render prompts for them).
- **Backend → Railway/Fly/any Node host**: `backend/Dockerfile` builds a
  production image; just set the same env vars.
- **Frontend → Vercel**: `vercel.json` included, set `VITE_API_URL` to your
  deployed backend's `/api` URL in the Vercel dashboard.
- **Frontend → Netlify**: `netlify.toml` included.
- **MongoDB**: use MongoDB Atlas free tier — put the connection string in
  `MONGO_URI`.

## Project structure

```
backend/
  server.js                Express app: helmet, rate limits, sanitize, error handling
  config/db.js              MongoDB connection
  models/                   User, Resume (Mongoose schemas)
  middleware/                JWT auth guard, memory-storage upload, validation
  controllers/                auth (+account settings), resume CRUD/upload, AI suggestions
  routes/                     /api/auth, /api/resumes, /api/ai
  utils/                       token signing, validators, in-memory PDF/DOCX text extraction
  tests/                       Jest + Supertest suite

frontend/
  src/pages/                 one component per flow step, plus AccountSettings
  src/components/            Navbar, RepeatingGroup (multi-entry experience/education/projects)
  src/components/templates/  Classic, Modern, Minimal resume layouts (education + projects aware)
  src/context/                AuthContext (session), DraftContext (in-progress resume)
  src/utils/exportDocx.js     client-side DOCX generation
```

## API reference

| Method | Path                        | Purpose                                     |
|--------|------------------------------|-----------------------------------------------|
| POST   | /api/auth/register            | Create account (rate-limited, validated)      |
| POST   | /api/auth/login                | Sign in, returns JWT (rate-limited)           |
| GET    | /api/auth/me                    | Current user                                  |
| PUT    | /api/auth/me                     | Update name                                   |
| PUT    | /api/auth/me/password             | Change password                              |
| GET    | /api/resumes?search=&page=&limit= | List resumes, searchable, paginated        |
| POST   | /api/resumes                       | Save a resume (validated)                   |
| GET    | /api/resumes/:id                    | Get one resume (owner-only)                 |
| PUT    | /api/resumes/:id                     | Update a resume (validated, whitelisted)    |
| DELETE | /api/resumes/:id                      | Delete a resume                            |
| POST   | /api/resumes/:id/duplicate              | Duplicate a resume                       |
| POST   | /api/resumes/upload                      | Upload PDF/DOCX, parsed in memory        |
| POST   | /api/ai/suggest                           | AI suggestions (rate-limited)           |

## Still worth doing before a real public launch

These are genuinely outside what a codebase alone can cover:

- Password reset / email verification (needs an email provider — SendGrid,
  Postmark, etc — wire into `authController.js`)
- A privacy policy and terms of service page
- Production monitoring/logging (e.g. Sentry) and uptime alerts
- A real domain + TLS (handled automatically by Vercel/Render/Netlify)
- The resume-upload parser is a lightweight heuristic, not a robust parser —
  fine for a demo/MVP, worth swapping for a dedicated parsing service at scale
- Load-testing the `/api/ai/suggest` endpoint and setting an OpenAI spend cap
