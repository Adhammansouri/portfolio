# Plan 005: Turn project details into visual case studies

> **Executor instructions**: Complete Plan 001 first. Implement renderer and
> cover support, but never generate, download, or fabricate portfolio evidence.
> Update Plan 005 in plans/README.md when the code and checks are complete.
>
> **Drift check**: The plan was authored from a workspace with no Git metadata.
> If Cursor has a clone, run git status --short. Compare live data, types, and
> project components with the excerpts below before editing.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/001-portfolio-quality-baseline.md
- **Category**: product presentation and security
- **Planned at**: workspace snapshot, 2026-08-11

## Why this matters

Seeded project case studies already contain Markdown headings, lists, bold
text, and inline code. Projects/Show currently puts body_md in a
whitespace-pre-wrap div, so visitors see raw syntax instead of a polished
narrative. The model and TypeScript type also have a cover field, but the
current seed data sets every cover to null and neither list nor detail UI
renders a cover.

This plan safely renders GFM Markdown, adds graceful cover support, and defines
an honest asset handoff. It must not claim work with invented visuals.

## Current state

- database/seeders/data/projects.php includes content beginning with headings
  such as ## What I built, ordered/unordered lists, and inline code.
- Each current project cover is null.
- Project::toLocaleArray and ProjectItem already expose cover and body_md.
- Projects/Show.tsx directly interpolates project.body_md.
- ProjectRow.tsx is a text-only row.
- package.json has no Markdown renderer dependency.

Confirm these excerpts:

    # Projects/Show.tsx
    {project.body_md && (
        <div className="prose-portfolio mt-14 max-w-3xl whitespace-pre-wrap ...">
            {project.body_md}
        </div>
    )}

    # projects.php
    'cover' => null,
    'body_md' => "## What I built
    - Auth, onboarding, and tabbed home ..."

    # resources/js/types/index.d.ts
    cover: string | null;
    body_md?: string | null;

Use existing Tailwind utilities/tokens. Match current external-link behavior:
target=_blank and rel=noreferrer. Never enable raw HTML in Markdown.

## Commands you will need

| Purpose | Command | Expected result |
|---|---|---|
| Add runtime packages | npm install react-markdown remark-gfm | manifest and lock update |
| Typecheck | npm run typecheck | exit 0 |
| Build | npm run build | exit 0 |
| Backend suite | php artisan test | exit 0 |

## Scope

**In scope**

- package.json
- package-lock.json
- resources/js/Pages/Projects/Show.tsx
- resources/js/Components/ProjectRow.tsx
- resources/js/types/index.d.ts only if a renderer helper requires it
- database/seeders/data/projects.php only after real assets are supplied
- public/images/projects/ only for approved genuine assets
- README.md

**Out of scope**

- Generating/downloading/fabricating screenshots, client logos, or results.
- Raw HTML parsing, rehype-raw, database migrations, and a broad redesign.

## Git workflow

If Git is available, use branch advisor/005-visual-project-case-studies. Keep
dependency/UI changes focused; commit real visual assets separately if their
size makes review difficult. Do not push automatically.

## Steps

### Step 1: Render Markdown safely

Install react-markdown and remark-gfm as runtime dependencies. Do not add
rehype-raw or any equivalent raw-HTML renderer.

In Projects/Show.tsx replace direct body_md output with ReactMarkdown using
remarkGfm. Supply Tailwind component renderers for h2, h3, p, ul, ol, li,
strong, code, and a. Styling must fit the current Precision Studio palette:
compact accent headings, readable ink paragraphs, clear lists, and subtle code
chips. Markdown links that leave the site must retain target=_blank and
rel=noreferrer. Keep the block absent for null/blank body_md.

**Verify**: npm run typecheck exits 0; on /en/projects/nazm, headings and lists
render structurally rather than showing literal hash, dash, or asterisk syntax.

### Step 2: Add optional visual covers

In Projects/Show add a cover block above the narrative only when project.cover
is non-empty. Use title-derived alternative text, responsive aspect ratio,
object-cover, and a suitable loading strategy. Do not create an empty frame for
null covers.

In ProjectRow add an optional lazy-loaded thumbnail that collapses cleanly on a
narrow viewport. Null covers must preserve the current text-only layout. Use
image width/height only when dimensions are known; avoid guessing dimensions.

**Verify**: npm run build exits 0 and all existing null-cover projects display
without broken-image requests or empty media containers.

### Step 3: Add only genuine supplied assets

Document in README that case-study covers go under public/images/projects, must
be owned or explicitly approved for public sharing, and should use compressed
WebP/AVIF where practical. Use this naming convention:

    public/images/projects/<project-slug>.webp

Only after the owner supplies a real approved image, set its matching cover in
database/seeders/data/projects.php to its public path. If no image is supplied,
leave cover null; the UI implementation is still complete.

**Verify**: each supplied image loads from both EN and AR project URLs and has
title-based alternative text.

### Step 4: Run release validation

Run:

    npm run typecheck
    npm run build
    php artisan test

All commands must exit 0.

## Test plan

The project currently has no React component-test runner. Do not introduce an
unrelated test framework for this focused task. Use typecheck/build and record
these manual checks:

1. Visit /en/projects/nazm and /ar/projects/nazm; headings/lists are structured.
2. Confirm no raw Markdown syntax is presented as a heading or list.
3. Confirm a null-cover project has no empty image area.
4. If a real cover exists, inspect detail and row views on desktop and mobile.
5. Confirm Markdown external links retain safe rel behavior.

## Done criteria

- [ ] body_md uses safe GFM rendering without raw HTML.
- [ ] Detail and row UI render supplied covers and omit null covers gracefully.
- [ ] No fabricated or unauthorized asset is added.
- [ ] README contains asset ownership, location, and naming guidance.
- [ ] Typecheck, build, and backend suite pass.
- [ ] No out-of-scope file changed.
- [ ] Plan 005 is marked DONE in plans/README.md.

## STOP conditions

- No genuine approved visual asset exists for a requested cover.
- Existing content needs raw HTML to display correctly.
- The Markdown dependency is incompatible with React 19 or fails the build
  after two reasonable version attempts.

## Maintenance notes

Treat cover paths as public commitments and remove them if permission changes.
If a future admin edits body_md, keep raw HTML disabled and add editorial
validation/previewing.
