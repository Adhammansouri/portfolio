# Implementation Plans

Generated on 2026-08-11 for the Laravel/Inertia bilingual portfolio. Execute
the plans in order. Each executor must read the plan fully, obey its STOP
conditions, and update this table after completing it.

The supplied workspace had no Git metadata. If Cursor has a Git clone, create
one focused branch per plan and check the in-scope diff before each commit.

## Execution order and status

| Plan | Title | Priority | Effort | Depends on | Status |
|------|-------|----------|--------|------------|--------|
| 001 | Establish a portfolio-specific quality baseline | P1 | M | none | TODO |
| 002 | Secure and deliver contact-form submissions | P1 | M | 001 | TODO |
| 003 | Make content updates non-destructive | P1 | M | 001 | TODO |
| 004 | Add crawlable bilingual discovery metadata | P2 | M | 001 | TODO |
| 005 | Turn project details into visual case studies | P2 | M | 001 | TODO |

Status values: TODO | IN PROGRESS | DONE | BLOCKED (include reason) | REJECTED
(include reason).

## Dependency notes

- Plan 001 establishes the test baseline required by every other plan.
- Plans 002 and 003 can run in parallel after Plan 001.
- Plans 004 and 005 can also run in parallel after Plan 001, but must keep the
  existing EN/AR route convention.

## Production handoff after all plans

1. Set APP_URL to the final HTTPS domain.
2. Configure SMTP and CONTACT_RECIPIENT_EMAIL on the host; never commit real
   credentials or addresses.
3. Back up the production database before running the content seeder.
4. Run php artisan migrate --force, then run the portfolio seeder only when
   intentionally publishing source-controlled content, then npm ci
   --legacy-peer-deps, npm run build, and php artisan optimize.
5. Check /en, /ar, /sitemap.xml, /robots.txt, the contact form, and a project
   detail page on the deployed domain.

## Deferred work

- A protected content/message admin panel requires a separate product and
  authorization decision.
- Turnstile requires an external Cloudflare account and keys. Plan 002 applies
  server-side rate limiting and a honeypot first.
