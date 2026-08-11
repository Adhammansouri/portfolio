# Plan 004: Add crawlable bilingual discovery metadata

> **Executor instructions**: Complete Plan 001 first. Follow this plan without
> claiming full social-card rendering where the hosting does not execute React.
> Update Plan 004 in plans/README.md only after every check passes.
>
> **Drift check**: This plan was authored without Git metadata. If Cursor has a
> clone, run git status --short. Compare current routes, metadata pages, and
> public/robots.txt with the excerpts below.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: plans/001-portfolio-quality-baseline.md
- **Category**: SEO and discovery
- **Planned at**: workspace snapshot, 2026-08-11

## Why this matters

Home has a description and a few Open Graph tags, but the project index,
experience, and contact pages have titles only. The site has no canonical or
alternate-language metadata, sitemap, or sitemap declaration. That weakens
search discovery and sharing for a bilingual professional portfolio.

This plan creates one reusable metadata component, generates crawlable
sitemap.xml and robots.txt responses, and derives all absolute URLs from
APP_URL. It preserves the public EN/AR URL structure.

## Current state

- Home.tsx uses Head with title, description, og:title, og:description, and
  og:image.
- Projects/Index.tsx, Experience.tsx, and Contact.tsx use Head with title only.
- HandleInertiaRequests shares locale, dir, translations, auth, and flash, but
  not APP_URL.
- routes/web.php has no sitemap.xml or robots.txt route.
- public/robots.txt is a static allow-all file, which would shadow a dynamic
  Laravel robots route.

Confirm these excerpts:

    # Home.tsx
    <Head>
        <title>{profile.name}</title>
        <meta name="description" content={profile.headline} />
        <meta property="og:title" content={...} />
    </Head>

    # Projects/Index.tsx
    <Head title={t('projects.title')} />

    # HandleInertiaRequests.php
    'locale' => $locale,
    'dir' => $dir,
    'translations' => $this->loadTranslations($locale),

Use the existing Inertia Head, TypeScript path aliases, localePath and
swapLocalePath helpers, and Tailwind design tokens. Never hardcode a production
domain; use APP_URL/config app.url.

## Commands you will need

| Purpose | Command | Expected result |
|---|---|---|
| SEO route tests | php artisan test --filter=SeoRoutesTest | exit 0 |
| Full suite | php artisan test | exit 0 |
| Typecheck | npm run typecheck | exit 0 |
| Build | npm run build | exit 0 |
| PHP style | vendor/bin/pint --test | exit 0 |

## Scope

**In scope**

- app/Http/Middleware/HandleInertiaRequests.php
- app/Http/Controllers/SitemapController.php (create)
- app/Http/Controllers/RobotsController.php (create)
- routes/web.php
- public/robots.txt (remove)
- resources/views/sitemap.blade.php (create)
- resources/js/Components/SeoHead.tsx (create)
- resources/js/lib/seo.ts (create)
- resources/js/types/index.d.ts
- resources/js/Pages/Home.tsx
- resources/js/Pages/About.tsx
- resources/js/Pages/Contact.tsx
- resources/js/Pages/Experience.tsx
- resources/js/Pages/Projects/Index.tsx
- resources/js/Pages/Projects/Show.tsx
- README.md
- tests/Feature/SeoRoutesTest.php (create)

**Out of scope**

- Inertia SSR, new hosting, analytics, cookie banners, and third-party SEO
  services.
- Changes to public page copy unrelated to metadata.

## Git workflow

If Git is available, use branch advisor/004-bilingual-seo-sitemap. Do not push
or open a PR automatically.

## Steps

### Step 1: Share APP_URL and build reusable metadata helpers

Share normalized config('app.url') from HandleInertiaRequests, add the
non-null type to PageProps, and create resources/js/lib/seo.ts. The helpers must
join app URL/path without duplicate slashes, create the alternate locale path
with swapLocalePath, and map EN to en_US and AR to ar_EG for Open Graph.

Create SeoHead.tsx with Inertia Head. It accepts title, description, locale,
canonical path, optional image, optional type, and optional JSON-LD. It emits
title/description, canonical URL, EN/AR alternates plus x-default, Open Graph
title/description/url/type/locale/image, and Twitter card/title/description/
image. Serialize JSON-LD with JSON.stringify only; do not use raw user HTML.

**Verify**: npm run typecheck exits 0.

### Step 2: Apply metadata to every public page

Replace direct Head use on Home, About, Contact, Experience, Projects/Index,
and Projects/Show with SeoHead.

- Home uses profile name, title, headline, portrait and root locale path. Add
  Person JSON-LD with public name/title/portrait/public social URLs only.
- About uses profile bio; Contact uses contact lead; Experience uses experience
  lead; Projects/Index uses projects lead.
- Project detail uses project title, summary, localized slug path, and cover
  image only when supplied.

Keep app.tsx title behavior and retain the EN/AR locale in each current URL.

**Verify**: npm run typecheck and npm run build exit 0.

### Step 3: Add server-generated discovery endpoints

Create an invokable SitemapController. It queries projects by sort_order and
renders absolute URLs for EN and AR home, projects, experience, about, contact,
and every localized project slug. Use updated_at as lastmod when available.
Render XML through a Blade sitemap view with escaped values and
application/xml content type.

Create an invokable RobotsController returning plain text: allow all and an
absolute sitemap URL made with url('/sitemap.xml'). Register GET /sitemap.xml
and /robots.txt before the locale group. Remove public/robots.txt so Laravel
receives the request.

**Verify**: php artisan route:list lists both discovery endpoints.

### Step 4: Add tests and production notes

Create SeoRoutesTest with RefreshDatabase and seeded data. Assert sitemap XML
is 200, contains /en, /ar, and nazm, and uses the configured test APP_URL.
Assert robots text is 200 and references /sitemap.xml.

Document in README that production APP_URL must be the final HTTPS host and
that /sitemap.xml and /robots.txt are post-deploy checks.

**Verify**:

    php artisan test --filter=SeoRoutesTest
    php artisan test
    npm run typecheck
    vendor/bin/pint --test
    npm run build

All commands exit 0.

## Test plan

- SeoRoutesTest uses RefreshDatabase and the existing DatabaseSeeder.
- Assert XML status/content type and EN, AR, nazm, and configured APP_URL in
  sitemap output.
- Assert plain-text robots output contains the sitemap endpoint.
- Typecheck/build validates the shared React metadata component; inspect a
  localized project URL manually for the correct canonical/alternate paths.

## Done criteria

- [ ] Every scoped public page uses SeoHead.
- [ ] Canonical, EN/AR alternate, Open Graph, and Twitter URLs use APP_URL.
- [ ] Home has public-only Person JSON-LD.
- [ ] sitemap.xml contains static and localized seeded-project URLs.
- [ ] robots.txt is dynamic and declares the absolute sitemap URL.
- [ ] All tests, typecheck, style check, and build pass.
- [ ] No out-of-scope file changed.
- [ ] Plan 004 is marked DONE in plans/README.md.

## STOP conditions

- APP_URL is blank, localhost, or not the final HTTPS production URL when
  deploying.
- Correct LinkedIn/Facebook cards are required before JavaScript executes.
  Inertia client Head may not satisfy non-JavaScript crawlers; approve SSR or
  server-rendered per-route metadata first.
- The web server still serves static robots.txt after its removal.

## Maintenance notes

Every new public page needs SeoHead and, if crawlable, a sitemap entry. A new
locale must be added to the Open Graph locale map and sitemap generation.
