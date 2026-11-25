# Feedback rollout

## Links
- `/feedback` offers both surveys.
- `/feedback/registration`: three questions after an enquiry, with contact details or a personalised invitation.
- `/feedback/visit`: the uploaded IFM questionnaire, in six short steps, with optional anonymous responses.
- `/admin/feedback`: owner-only responses, filters, review status, notes, CSV (latest 1,000 matching rows) and individual Print / Save as PDF. Summary scores explicitly cover the current page.

## Activate in production
1. Complete `docs/ADMIN-SETUP.md` if not already done. Use the main website's Vercel project `kindredpathfertilitycentre`, not the campaign project `kpf2026`.
2. Run `migrations/001_main_website_dashboard.sql` if not already applied, then `migrations/002_feedback.sql` in the same Supabase project's SQL Editor. The latter is additive and safe to rerun. Public submission access stays server-only; no anonymous or authenticated browser database grants are added.
3. Verify main-site Production values for `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL`, and `SITE_URL=https://www.ifmkindredpathfertilitycentre.com`.
4. Add a strong random `CRON_SECRET` (at least 32 random bytes, generated locally and entered directly in Vercel). Do not put it in git or public variables.
5. Initially leave `FEEDBACK_EMAILS_ENABLED` absent or `false`. Redeploy, log in, confirm surveys are available, and submit controlled test feedback. Confirm it appears in `/admin/feedback`, exports correctly, and anonymous responses show no enquiry association. No live test mail was sent during implementation.
6. Set `FEEDBACK_EMAILS_ENABLED=true` and redeploy when ready for invitations. Existing `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, `ENQUIRY_TO_EMAIL` values and the old email handler remain unchanged. The new feedback sender uses the existing verified sender; staff notices go to `ADMIN_EMAIL`.
7. Confirm the `/api/cron/feedback` job exists in Vercel Cron Jobs. Its daily schedule is `0 9 * * *` (09:00 UTC / 10:00 WAT). Daily processing means an invitation goes on the first daily run after its five-day due time, not necessarily exactly 120 hours later. Vercel Hobby timing may vary within the hour.

## Invitation rules
- Only NEW main-site `appointment` and `contact` submissions with email and consent enqueue registration feedback. Existing rows, planner downloads, consultant referrals and the separate campaign do not automatically receive this survey. No historical bulk emailing occurs.
- In an appointment record, use **Attended visit** and the actual visit date to enqueue visit feedback five days later. Repeated marking updates an unsent invitation's date, never creates a second invite for the same enquiry. One visit survey per enquiry; repeat care needs its own enquiry record.
- The queue spaces invitations for the same enquiry at least three days apart. Tokens expire 30 days after the scheduled due time. Links carry the invitation token in the URL fragment, keeping it out of server URL logs and referrers; survey pages do not run site analytics.
- Registration responses via invitations are linked to the enquiry. Generic shareable links ask for email or phone; staff match those manually. No invitation token is disclosed by the public API, and no patient data is placed in email subjects.
- Anonymous visit submissions discard name, email, phone and invitation association server-side. They are not marked against an individual's invitation; there is no reminder sequence. Do not claim immunity from infrastructure access logs or timing inference.
- Each daily batch claims up to 10 invitations atomically. A failed or uncertain delivery is not automatically retried; review Resend logs before manual reconciliation. A stalled claim becomes failed after 20 minutes on a later run. The dashboard displays the latest 50 invitation statuses. This initial version has no resend button.
- Up to five brief staff notices are attempted each daily run. They contain only a private dashboard link, not survey answers. `notified_at` records the attempt before delivery to avoid duplicate notices after uncertain results; check Resend logs if a notice is missing. The complete feedback remains available regardless of mail success.
- Submission UUID and invitation consumption prevent accidental repeat submissions. Public submissions are rate-limited by an hourly salted IP hash; raw IPs are not stored in feedback tables. Hourly buckets are cleaned after two hours when writes occur. CSRF origin checks, server validation, RLS, owner checks and CSV formula neutralisation protect these routes.
- Survey records persist until an authorised retention process is agreed. No public testimonials, automatic deletion or clinical record functionality is introduced.

## Checks run
`npm run build`; `node --test tests/dashboard.cjs tests/feedback.cjs`.
Both SQL migrations were also exercised in disposable local PostgreSQL (PGlite), including repeat migration, timing, atomic claims, single-use invitations, anonymous unlinking and denied anonymous table access. Production Supabase migration and live sender verification are separate rollout steps.
