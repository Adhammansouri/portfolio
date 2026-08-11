# Plan 003: Make content updates non-destructive

> **Executor instructions**: Complete Plan 001 first. Do not run destructive
> database commands against production while executing this plan. Stop on a
> STOP condition and update Plan 003 in plans/README.md after completion.
>
> **Drift check**: This plan was authored without Git metadata. If Cursor has
> a clone, run git status --short. Compare the live seeder and README with the
> current-state excerpts before editing.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/001-portfolio-quality-baseline.md
- **Category**: data safety and docs
- **Planned at**: workspace snapshot, 2026-08-11

## Why this matters

README.md currently tells editors to use php artisan migrate:fresh --seed for a
content change. That rebuilds every database table, including
contact_messages. PortfolioSeeder also deletes all portfolio-content rows and
recreates them on every seed. This makes a minor biography or project edit
needlessly risky.

This plan makes the source-controlled portfolio seeder idempotent. Re-running
it updates known public content without duplicates, without deleting contact
messages, and without changing existing project/profile IDs. It also documents
a safe production workflow.

## Current state

- README.md Content updates directs the user to migrate:fresh --seed.
- DatabaseSeeder calls PortfolioSeeder.
- PortfolioSeeder::run begins with deletes for Profile, Experience, Project,
  Skill, Education, Certification, LeadershipItem, and Capability.
- Project has a unique slug; ProjectTranslation has a unique project_id/locale
  pair; translations are currently created through the project relationship.
- Each supplied seed list has a sort_order. Confirm uniqueness before using it
  as a stable key.

Confirm these excerpts:

    # PortfolioSeeder::run
    Profile::query()->delete();
    Experience::query()->delete();
    Project::query()->delete();
    Skill::query()->delete();
    ...

    # PortfolioSeeder::seedProjects
    $project = Project::create($data);
    foreach ($translations as $locale => $t) {
        $project->translations()->create(array_merge($t, ['locale' => $locale]));
    }

    # README.md
    Edit seed data under database/seeders/ then:
    php artisan migrate:fresh --seed

Use Eloquent and the existing model relationships. Preserve all bilingual JSON
content and current sort order. The seeder remains the source of truth for
public content; do not add an admin UI here.

## Commands you will need

| Purpose | Command | Expected result |
|---|---|---|
| Seeder regression test | php artisan test --filter=PortfolioSeederTest | exit 0 |
| Local disposable seed | php artisan db:seed --class=PortfolioSeeder | exit 0 |
| Full suite | php artisan test | exit 0 |
| PHP style | vendor/bin/pint --test | exit 0 |

## Scope

**In scope**

- database/seeders/PortfolioSeeder.php
- README.md
- tests/Feature/PortfolioSeederTest.php (create)

**Out of scope**

- database/migrations and database schema changes.
- contact_messages data/schema.
- Production database commands.
- Admin content management.

## Git workflow

If Git is available, use branch advisor/003-safe-content-seeding. Keep seeder,
test, and documentation changes in one focused commit. Do not push.

## Steps

### Step 1: Replace delete-and-create logic with stable upserts

Remove all query()->delete calls from PortfolioSeeder::run. Preserve existing
content arrays and seed-method organization, but use updateOrCreate or
firstOrNew/save with the following verified stable keys:

- Profile: firstOrNew singleton, fill, save.
- Project: slug.
- ProjectTranslation: locale on the resolved project relationship.
- Experience: company plus starts_on.
- Skill: group plus name.
- Education, Certification, LeadershipItem, Capability: sort_order, only after
  confirming it is unique within each supplied model list.

Pass the current full seed payload as update data. Keep nested project
translations outside the Project payload. Do not delete rows no longer present
in source data; such deletion needs a deliberate later migration or approved
admin operation.

**Verify**: run the portfolio seeder twice on a disposable local database. The
second execution exits 0 and adds no duplicate public-content records.

### Step 2: Add idempotence and enquiry-preservation tests

Create PortfolioSeederTest using RefreshDatabase. Seed once, retain the profile
id and nazm project id, then insert a synthetic ContactMessage. Seed a second
time and assert:

1. exactly one profile remains and retains its id;
2. nazm retains its id;
3. nazm still has one EN and one AR translation;
4. project and skill counts do not grow;
5. the ContactMessage remains.

Use no .env values and no production database.

**Verify**: php artisan test --filter=PortfolioSeederTest exits 0.

### Step 3: Replace destructive documentation

Rewrite README Content updates to require a database backup, editing only seed
data, then:

    php artisan db:seed --class=PortfolioSeeder

State that migrate:fresh is only for disposable local databases and must never
be used where contact messages or retained data exist. Update Hostinger
instructions so schema updates use php artisan migrate --force; run the
portfolio seeder only when intentionally publishing source-controlled content.

**Verify**: rg -n "migrate:fresh --seed" README.md produces no production
instruction and README contains the db:seed command.

### Step 4: Run the verification gate

Run:

    php artisan test --filter=PortfolioSeederTest
    php artisan test
    vendor/bin/pint --test

All commands must exit 0. Do not use migrate:fresh as a verification command.

## Test plan

- PortfolioSeederTest uses RefreshDatabase and never accesses a production DB.
- Seed twice, then assert stable profile/project ids, no growth in project/skill
  counts, two translations for nazm, and survival of a synthetic ContactMessage.
- Run the focused seeder test before the complete PHP suite and style check.

## Done criteria

- [ ] PortfolioSeeder has no delete, truncate, or destructive reset call.
- [ ] Re-running it does not duplicate seeded content.
- [ ] A ContactMessage survives repeat seeding in a test.
- [ ] README uses db:seed for content updates and warns about migrate:fresh.
- [ ] Focused/all test and style checks pass.
- [ ] No out-of-scope file changed.
- [ ] Plan 003 is marked DONE in plans/README.md.

## STOP conditions

- Any seed list has no stable unique key.
- Production data contains manual content that must override source seeds.
- An existing project has a non-EN/AR translation that the new code would
  overwrite.

## Maintenance notes

Choose and document a stable key before adding a new seeded model. If a future
admin owns content, stop running this seeder during deployment and migrate the
source data once into the admin-managed path.
