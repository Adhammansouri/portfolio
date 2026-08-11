# Adham Mansour — Portfolio

Bilingual (EN/AR) professional portfolio built with **Laravel 12 + Inertia.js + React 19 + Tailwind CSS 4 + Motion**.

## Features

- Precision Studio design system (Syne + IBM Plex, emerald accent)
- Locale routes: `/en/...` and `/ar/...` with RTL
- Content via database seeders (no admin panel)
- CV download at `/resume`
- Hostinger-friendly single-app deploy

## Requirements

- PHP 8.2+
- Composer
- Node 20+
- SQLite (default) or MySQL

## Setup

```bash
composer install
cp .env.example .env   # if needed
php artisan key:generate

# SQLite (default) already works — or configure MySQL in .env
php artisan migrate --seed

npm install --legacy-peer-deps
npm run build
php artisan serve
```

Open http://127.0.0.1:8000 (redirects to `/en`).

### Dev mode

```bash
composer run dev
# or: php artisan serve + npm run dev
```

## Content updates

Edit seed data under `database/seeders/` then:

```bash
php artisan migrate:fresh --seed
```

## Hostinger deploy

1. Upload the project (or git pull) to the domain root / subdomain.
2. Point the document root to `public/`.
3. Set `.env` (`APP_URL`, DB credentials if MySQL).
4. Run `composer install --no-dev -o`, `npm ci --legacy-peer-deps && npm run build`, `php artisan migrate --seed --force`.
5. Ensure `storage/` and `bootstrap/cache/` are writable.

## Assets

- Photo: `public/images/adham-mansour.png`
- CV: `public/cv/Adham_Mansour_CV.pdf` (download route: `/resume`)

## Stack note

Auth scaffolding from Breeze remains in the repo but portfolio routes are public and seeder-driven. Auth routes are unused for the public site.
