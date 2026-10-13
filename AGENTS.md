# HIDEKI development

Use the existing checkout; do not create worktrees unless the user requests one.

Project skills are installed in `.agents/skills/`. Read the relevant SKILL.md before applying a skill. Source repositories, paths and pinned upstream commits are recorded in `.agents/skills/sources.json`. These are development instructions, not runtime JavaScript dependencies.

Use frontend-design, web-design-guidelines and vercel-react-best-practices for UI changes; framer-motion for animation; webapp-testing for browser validation; security-best-practices and better-auth-best-practices for account changes. Use supabase-postgres-best-practices before introducing Postgres; the current local database is SQLite. Do not claim Supabase is connected.

Read the relevant Next.js guide in `node_modules/next/dist/docs/` before using unfamiliar APIs; this project uses Next.js 16.4.0.

Commands: `npm ci`, `npm run setup:auth`, `npm run typecheck -- --incremental false`, `npm run check:inquiry`, `npm run build`, `npm start`. For browser QA, start production on localhost:3000 and run `npm run check:browser` with Python Playwright and `/usr/bin/chromium` available. The browser suite creates test accounts with @example.test addresses; never send real emails or Telegram messages during tests.

Keep secrets in ignored local files or environment settings. Never include database files, credentials, personal client content or session cookies in Git. Public portfolios and press references require verified attribution and publication rights. Demo projects must remain identified as concepts until replaced by approved work. See `RELEASE_READINESS.md` for current deployment requirements.
