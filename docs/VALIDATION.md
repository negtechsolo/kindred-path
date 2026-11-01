# Validation — 1 November 2026

- Production Next.js build and TypeScript: passed.
- 14 automated regression checks: passed (`npm run test:dashboard`).
- Original email-handler file matches the inspected Git blob exactly (`7f26fbbf0f2d717d086c4d1161814bdcfb94231b`).
- Tests compare original vs wrapped email request headers, payload, response and single send under storage success/failure and provider success/failure. Tests also cover missing email configuration, ignored spam/invalid submissions, category capture, anonymous API denial, wrong-account denial, same-origin sign-in, HttpOnly cookies, follow-up saving without email and precise WAT campaign expiry.
- Campaign booking destination returned HTTP 200. The campaign source contains the `#ways` section and optional-details question modal; no `/ask` route exists there. Question CTA targets the real section.
- Whitespace/diff check: passed.
- No live email or SMS was sent. Test network calls are mocked.
- Browser visual QA was blocked: the managed preview runner injects Vite-style `--host`/`--strictPort` flags which `next dev` does not support. No application configuration was changed to work around this environment limitation.
- Live Supabase migration, owner authentication and data persistence are not verified without deployment credentials. A connected database and environment variables are required; see ADMIN-SETUP.md. Historical email-only records have not been imported.
