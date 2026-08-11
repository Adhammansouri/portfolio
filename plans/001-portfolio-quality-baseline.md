# Plan 001: Establish a portfolio-specific quality baseline

> **Executor instructions**: Follow every step, run each verification command,
> and update Plan 001 in plans/README.md only after all done criteria pass.
>
> **Drift check**: This plan was authored from a workspace with no Git metadata.
> If Cursor has a Git clone, first run git status --short. In every case,
> compare the current files to the excerpts below; stop on material drift.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: tests and DX
- **Planned at**: workspace snapshot, 2026-08-11

## Why this matters

php artisan test currently has 23 failures and only two passes. The failures
are mostly default Breeze tests for login, password, and profile routes, but
this portfolio registers only routes/web.php and exposes public EN/AR pages.
The actual website and its redirect behavior have no meaningful regression
coverage. This plan replaces the stale expectations with a small public-site
suite that later plans can rely on.

It deliberately does not remove unused Breeze source files. README.md says the
scaffold remains but public portfolio routes are the product; removing it or
turning it into an admin panel is a separate decision.

## Current state

- bootstrap/app.php registers routes/web.php, commands, and health only. It
  does not load routes/auth.php.
- routes/web.php redirects / to /en and accepts locale values en and ar only.
- tests/Feature/ExampleTest.php expects GET / to be 200 even though it is a
  redirect.
- tests/Feature/Auth/*.php and tests/Feature/ProfileTest.php expect routes that
  are not registered.
- phpunit.xml uses SQLite in memory, array mail, sync queue, and array session.
- package.json has build and dev scripts but no standalone typecheck script.

Confirm these excerpts before editing:

    # bootstrap/app.php
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )

    # routes/web.php
    Route::redirect('/', '/en');
    Route::prefix('{locale}')->whereIn('locale', ['en', 'ar'])

    # tests/Feature/ExampleTest.php
    $response = $this->get('/');
    $response->assertStatus(200);

Follow the existing conventions: PSR-12 PHP, four-space indentation,
descriptive PHPUnit test methods, and RefreshDatabase for tests needing seeded
data. See tests/Feature/ProfileTest.php for class structure only; do not retain
its stale route assertions.

## Commands you will need

| Purpose | Command | Expected result |
|---|---|---|
| PHP suite | php artisan test | exit 0 |
| Current typecheck | npx tsc --noEmit | exit 0 |
| Typecheck after Step 3 | npm run typecheck | exit 0 |
| PHP style | vendor/bin/pint --test | exit 0 |
| Production frontend check | npm run build | exit 0 |

## Scope

**In scope**

- tests/Feature/ExampleTest.php
- tests/Feature/PortfolioRoutesTest.php (create)
- tests/Feature/Auth/*.php (remove)
- tests/Feature/ProfileTest.php (remove)
- tests/Unit/ExampleTest.php (remove)
- package.json
- README.md

**Out of scope**

- routes/auth.php and all auth/profile source components.
- Any authentication, dashboard, or admin feature.
- Changes to public route behavior beyond asserting it.

## Git workflow

If Git is available, use branch advisor/001-portfolio-quality-baseline. Keep
one focused commit after all checks pass. Do not push or open a PR automatically.

## Steps

### Step 1: Remove stale default tests

Delete the Breeze test files below tests/Feature/Auth, tests/Feature/ProfileTest
.php, and tests/Unit/ExampleTest.php. Replace the placeholder root test with a
redirect assertion for / to /en, or delete it after moving that assertion into
the new focused suite. Do not register auth routes merely to satisfy tests.

**Verify**: php artisan test no longer reports a failure caused by GET / being
302 instead of 200.

### Step 2: Add portfolio route tests

Create tests/Feature/PortfolioRoutesTest.php. Use RefreshDatabase and call the
existing DatabaseSeeder in setup or each test, so the in-memory database has
Profile, projects, and both translations.

Test these cases:

1. GET / redirects to /en.
2. GET /en and GET /ar return 200.
3. GET /en/projects returns 200.
4. GET /en/projects/nazm and /ar/projects/nazm return 200 using the seeded
   slug.
5. GET /en/experience, /en/about, /en/contact, and /resume return successful
   responses.
6. GET /fr returns 404.

Assert HTTP behavior and database state only; do not couple PHP tests to
client-rendered React markup.

**Verify**: php artisan test --filter=PortfolioRoutesTest exits 0.

### Step 3: Add a reusable typecheck command and document gates

Add typecheck with value tsc --noEmit to package.json. Do not change the
existing build command because it already runs tsc before Vite.

Add a README Quality checks section listing:

    php artisan test
    npm run typecheck
    npm run build

State that all three must pass before deployment.

**Verify**: npm run typecheck exits 0.

### Step 4: Run the full gate

Run:

    php artisan test
    npm run typecheck
    vendor/bin/pint --test
    npm run build

Fix only failures introduced by this plan. Do not expand scope to unused Breeze
code.

## Test plan

PortfolioRoutesTest must cover the root redirect, both supported locales, one
seeded project in both locales, the supporting pages, resume download, and
invalid locale rejection. Future plans add focused ContactFormTest,
PortfolioSeederTest, and SeoRoutesTest; do not duplicate their concerns here.

## Done criteria

- [ ] php artisan test exits 0 with no stale auth/profile failures.
- [ ] PortfolioRoutesTest covers all cases listed above.
- [ ] npm run typecheck, vendor/bin/pint --test, and npm run build exit 0.
- [ ] README documents the release-gate commands.
- [ ] No files outside scope changed.
- [ ] Plan 001 is marked DONE in plans/README.md.

## STOP conditions

- Auth routes are now registered or an admin area is intended to ship.
- DatabaseSeeder no longer creates the nazm project and profile.
- The build fails twice for an unrelated pre-existing dependency issue.

## Maintenance notes

Every new public endpoint needs a portfolio feature test. Do not restore the
default Breeze tests unless their matching routes are intentionally registered.
