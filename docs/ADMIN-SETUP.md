# Kindred Path main-website dashboard

This change keeps the existing Resend request, recipients, sender, subject and HTML unchanged. The original `app/api/enquiries/route.ts` is preserved byte-for-byte as `app/api/enquiries/email-delivery.ts`. A wrapper records valid submissions independently and calls that original handler exactly once. No admin links or extra messages are added to any email. Database failure does not block the existing email request; it does mean the dashboard record can be missing. Check server recording-error logs and reconcile with retained notification emails after outages. This is not a clinical EMR.

## Connect the private dashboard

1. In Supabase, use a project under your control. This may be the existing project if desired: every new table/function starts with `kp_main_` and the migration does not change campaign tables.
2. Open **SQL Editor**, paste `migrations/001_main_website_dashboard.sql`, and run it. It adds records, aggregate activity and an audit table, with row-level security and no browser access grants.
3. In **Authentication → Users**, create your own owner account with a strong password and confirmed email (or use an existing confirmed account). Do not enable public signup for this purpose. No invitation or reset emails are sent by this code.
4. In the main website's Vercel project, add these server-only environment variables for the environment you intend to deploy:

| Variable | Value |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase public/anon API key, used by the server for password sign-in |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key; never a `NEXT_PUBLIC_` variable |
| `ADMIN_EMAIL` | Your confirmed owner account email; a single email only |
| `SITE_URL` | `https://www.ifmkindredpathfertilitycentre.com` (use the exact preview origin for a preview deployment) |

5. Leave `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL` and `ENQUIRY_TO_EMAIL` exactly as they are. Redeploy after adding the new variables.
6. Visit `/admin` directly and sign in. It is deliberately absent from menus, sitemap and emails. Authentication is checked on each data request; only `ADMIN_EMAIL` is allowed. A hidden URL alone is not access control. Sessions use an HttpOnly, Secure, SameSite=Strict cookie and expire after at most one hour. Expired sessions show an explicit sign-in action without interrupting typing or causing redirect loops.
7. Check that the dashboard loads without a configuration warning. Database rows, activity reports and follow-up saving require the SQL migration as well as keys. Validate with an authorised controlled submission only; it will trigger the existing email exactly as before.

No live credentials are included in the repository. No live email was sent during development. Code alone cannot activate storage or recover earlier submissions.

## What is included

- All four main-site submission categories: appointment requests (including survey answers), contact messages, consultant referrals and planner registrations.
- Search by contact, filter by category/status/received dates, pagination, original submitted fields, private notes, next follow-up and four workflow statuses. Saving a follow-up sends no mail. Referral patient details remain in the original message, with referrer details labelled in the submission.
- Email provider acceptance/failure status. `accepted` is not proof of inbox delivery. `pending` or `unknown` needs investigation, not automatic resend. No resend feature is provided.
- Last-30-days page views, daily totals, popular pages, referring hostnames and campaign/call/WhatsApp/planner link clicks. No unique visitor claim, cookies, keystrokes, form contents or raw IP storage. Browser Do Not Track is respected. An opaque hourly request bucket limits event writes; expired buckets are removed. Aggregate activity expires after 13 months when new events arrive.
- Server-protected records and follow-up audit entries. No delete or public export endpoint. Agree an appropriate enquiry retention/review policy internally; clinical records should live in the clinical system.

## Existing records

The prior handler was email-only. Historical enquiries must be recovered from retained notification emails or another verified export. Do not invent records or scrape mailboxes without authorisation. A future import should preserve original dates and fields, mark `source` as `historical_import` and `delivery` as `historical`, and deduplicate by original message ID. The new tables do not automatically pull data from the separate campaign app.

## Campaign

Both promotional areas expire at **2026-11-11 00:00 WAT**. Dynamic server rendering prevents a build-time cached expired banner; a client timer also removes it on already-open pages. Normal homepage content remains. Booking goes to the verified campaign `/book`; question CTA goes to `/#ways`, where the existing question modal is opened by the campaign's own button. This avoids inventing a nonexistent `/ask` route or changing the campaign repository. No mail logic in that repository is touched.

## Rollout checks

Run `npm run build` and `npm run test:dashboard`. Verify desktop/mobile campaign layouts, all three aligned dates, both destination links, expiry before/at the cutoff, no public admin links, unauthenticated API denial, wrong-account rejection, successful owner login/logout and follow-up saving. The automated mail regression compares request headers/payload, responses and send count against the original handler while simulating storage success and failure. Supabase credentials and live database execution are required for final end-to-end verification.
