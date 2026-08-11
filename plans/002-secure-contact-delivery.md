# Plan 002: Secure and deliver contact-form submissions

> **Executor instructions**: Complete Plan 001 first, then follow this plan
> exactly. Run every verification gate. Stop on any STOP condition and update
> Plan 002 in plans/README.md only after completion.
>
> **Drift check**: The authoring workspace had no Git metadata. If Cursor has
> a clone, run git status --short. Compare the current route, controller, form,
> and provider to the excerpts below before editing.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/001-portfolio-quality-baseline.md
- **Category**: security and lead reliability
- **Planned at**: workspace snapshot, 2026-08-11

## Why this matters

The public contact endpoint has validation but no rate limiting or bot trap, so
a bot can create unlimited contact_messages rows. Accepted messages are stored
but no owner notification is sent, making legitimate enquiries easy to miss.
This plan adds low-dependency server-side protection, accessible form feedback,
and opt-in SMTP notification while retaining each accepted enquiry.

Turnstile is deliberately deferred: it requires an external Cloudflare account
and keys. Do not substitute another CAPTCHA without explicit approval.

## Current state

- routes/web.php contains a public POST {locale}/contact route with no
  middleware beyond the locale group.
- ContactController::store uses inline Request validation and creates
  ContactMessage with name, email, message, and locale.
- Contact.tsx useForm data contains name, email, and message only.
- AppServiceProvider::boot only calls Vite::prefetch.
- phpunit.xml uses the array mailer, which is suitable for Mail::fake tests.

Confirm these excerpts:

    # routes/web.php
    Route::post('/contact', [ContactController::class, 'store'])
        ->name('contact.store');

    # ContactController::store
    $validated = $request->validate([
        'name' => ['required', 'string', 'max:120'],
        'email' => ['required', 'email', 'max:190'],
        'message' => ['required', 'string', 'max:5000'],
    ]);
    ContactMessage::create([...$validated, 'locale' => app()->getLocale()]);

    # AppServiceProvider::boot
    Vite::prefetch(concurrency: 3);

Match the current controller redirect and flash-success pattern. Match Tailwind
classes and existing ink/accent tokens; do not redesign the form.

## Commands you will need

| Purpose | Command | Expected result |
|---|---|---|
| Contact tests | php artisan test --filter=ContactFormTest | exit 0 |
| Full suite | php artisan test | exit 0 |
| Typecheck | npm run typecheck | exit 0 |
| Build | npm run build | exit 0 |
| PHP style | vendor/bin/pint --test | exit 0 |

## Scope

**In scope**

- app/Providers/AppServiceProvider.php
- routes/web.php
- app/Http/Controllers/ContactController.php
- app/Http/Requests/StoreContactMessageRequest.php (create)
- app/Mail/ContactMessageReceived.php (create)
- config/portfolio.php (create)
- resources/views/mail/contact-message-received.blade.php (create)
- resources/js/Pages/Contact.tsx
- .env.example
- README.md
- tests/Feature/ContactFormTest.php (create)

**Out of scope**

- .env or actual SMTP credentials/recipient values.
- Database schema changes, a protected inbox, or an admin dashboard.
- Turnstile/reCAPTCHA and third-party form services.

## Git workflow

If Git is available, use branch advisor/002-secure-contact-delivery. Do not
push or open a PR automatically.

## Steps

### Step 1: Configure an explicit recipient and a named rate limiter

Create config/portfolio.php with contact_recipient read from
CONTACT_RECIPIENT_EMAIL. The default must be null/empty; do not put an actual
address in tracked files. Add CONTACT_RECIPIENT_EMAIL= with no value to
.env.example and document in README that it and working SMTP are required for
email alerts.

In AppServiceProvider::boot, retain Vite::prefetch and register a named contact
limiter: three POST attempts per minute keyed by request IP. Apply
throttle:contact to the existing POST route only. Do not throttle the GET page
and do not key only by email, since bots can vary it.

**Verify**: php artisan route:list shows the localized POST contact route with
the contact throttle; GET contact remains unthrottled.

### Step 2: Centralize validation and add a server-enforced honeypot

Create StoreContactMessageRequest. authorize() returns true. Move the exact
existing name, email, and message constraints to rules(). Add website as a
nullable string field that must be empty using a server-side prohibited rule or
an equivalent validation rule.

Change ContactController::store to type-hint this request and use validated().
Never persist website. Preserve locale and the current success redirect.

**Verify**: valid data persists; invalid email, over-5000-character message,
and non-empty website persist nothing.

### Step 3: Send a safe notification after persistence

Create ContactMessageReceived with the saved ContactMessage as its data.
Create a Blade mail view that displays name, email, locale, timestamp, and
message with normal Blade escaping only. Never render user data as raw HTML.

After saving, read portfolio.contact_recipient. If configured, send the
mailable synchronously. If mail sending fails, report the exception and log
only the contact-message id; do not delete the record or expose the failure to
the visitor. If no recipient is configured, keep the record and log a clear
warning without message text. Do not queue mail: the documented Hostinger
workflow has no supervised queue worker.

**Verify**: with test config setting a recipient and Mail::fake, a valid post
asserts ContactMessageReceived was sent to that recipient.

### Step 4: Add the accessible honeypot field and regression tests

Add website: '' to Inertia useForm. Add a visually hidden, non-focusable input
with a real name and binding. Server validation is the security control; UI
hiding is only a bot signal.

Add role=status and aria-live=polite to the success block. Give error paragraphs
role=alert and associate an input with its error paragraph only when that error
is present. Preserve the current visible EN/AR copy.

Create ContactFormTest using RefreshDatabase and seeded data. Cover valid
localized submission and locale persistence, sent mail when configured, invalid
input, filled honeypot, and four same-IP submissions where the fourth is 429.
Clear the rate limiter between independent test cases.

**Verify**:

    php artisan test --filter=ContactFormTest
    php artisan test
    npm run typecheck
    vendor/bin/pint --test
    npm run build

All commands exit 0.

## Test plan

- ContactFormTest uses RefreshDatabase and seeded portfolio data.
- Cover valid EN/AR submission, persisted locale, fake-mail notification,
  invalid input, filled honeypot, and same-IP throttling with a 429 fourth
  request.
- Use Mail::fake and a test config override only; never send actual mail.
- Run the focused test first, then the complete backend/type/style/build gate.

## Done criteria

- [ ] POST contact uses a three-per-minute per-IP named limiter.
- [ ] StoreContactMessageRequest owns validation and rejects filled honeypots.
- [ ] Valid messages persist even if notification sending fails.
- [ ] Configured recipients receive ContactMessageReceived in tests.
- [ ] No real credential or recipient is committed.
- [ ] Form statuses/errors are announced accessibly.
- [ ] All verification commands pass and no out-of-scope file changed.
- [ ] Plan 002 is marked DONE in plans/README.md.

## STOP conditions

- SMTP cannot operate in the intended production environment and guaranteed
  delivery is required.
- Another contact provider or anti-spam integration is already live.
- Existing external clients cannot tolerate the three-per-minute limit.

## Maintenance notes

If spam continues, add Turnstile in a separately credentialed task rather than
weakening the server throttle. A future inbox must authorize access to the same
ContactMessage records and define retention/deletion policy.
