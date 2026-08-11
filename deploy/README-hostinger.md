# Hostinger Git deploy — portfolio

Site: [paleturquoise-hedgehog-868163.hostingersite.com](https://paleturquoise-hedgehog-868163.hostingersite.com/en)  
Repo: [Adhammansouri/portfolio](https://github.com/Adhammansouri/portfolio) · branch `main` · directory `public_html`

## Recommended workflow (push main → live site)

1. **One-time setup (local):**

```powershell
npm run setup:hooks
```

This installs `.githooks/pre-push`, which runs `npm run build` and commits `public/build` before every push to `main`.

2. **One-time setup (GitHub Actions secrets):**

In GitHub → **Settings → Secrets and variables → Actions**, add:

| Secret | Value |
|--------|--------|
| `HOSTINGER_SSH_HOST` | `213.130.145.182` |
| `HOSTINGER_SSH_PORT` | `65002` |
| `HOSTINGER_SSH_USER` | `u358087675` |
| `HOSTINGER_SSH_KEY` | contents of your private SSH key (`~/.ssh/id_ed25519`) |
| `HOSTINGER_REMOTE_PATH` | `/home/u358087675/domains/paleturquoise-hedgehog-868163.hostingersite.com/public_html` |

Or from your PC (if `gh` is logged in):

```powershell
gh secret set HOSTINGER_SSH_HOST --body "213.130.145.182"
gh secret set HOSTINGER_SSH_PORT --body "65002"
gh secret set HOSTINGER_SSH_USER --body "u358087675"
gh secret set HOSTINGER_REMOTE_PATH --body "/home/u358087675/domains/paleturquoise-hedgehog-868163.hostingersite.com/public_html"
Get-Content $env:USERPROFILE\.ssh\id_ed25519 | gh secret set HOSTINGER_SSH_KEY
```

3. **Day-to-day deploy:**

```powershell
git add .
git commit -m "your message"
git push origin main
```

GitHub Actions runs `deploy/hostinger.sh` on the server after every push to `main`.

**All-in-one (build + push + deploy in one command):**

```powershell
.\deploy\push-hostinger.ps1
```

## What prevents the white page

- **pre-push hook:** builds and force-commits `public/build` before `main` is pushed.
- **GitHub Action:** SSH deploy on every push to `main`.
- **hostinger.sh:** always runs `npm ci && npm run build` on the server, so missing gitignored assets cannot break the site.

## Connected (hPanel)

1. **Advanced → Git** → GitHub OAuth (`Adhammansouri`)
2. Repository: **portfolio**
3. Branch: **main**
4. Deploy directory: **public_html**

Hostinger Git pull is optional when GitHub Actions deploys via SSH. If you rely on hPanel auto-deploy only, you still must run `bash deploy/hostinger.sh` manually unless the Action is configured.

## Manual SSH deploy

```bash
ssh hostinger-smash
cd ~/domains/paleturquoise-hedgehog-868163.hostingersite.com/public_html
bash deploy/hostinger.sh
```

## Preserve `.env`

`.env` is gitignored and survives Git pulls. If missing after first deploy:

```bash
cp ~/portfolio-env-backup.env ~/domains/paleturquoise-hedgehog-868163.hostingersite.com/public_html/.env
```

## Custom domain

hPanel → **ربط الدومين** → point `adhammansour.com` (or similar), then update `APP_URL` in `.env`.
