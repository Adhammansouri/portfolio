# Hostinger Git deploy — portfolio

Site: `paleturquoise-hedgehog-868163.hostingersite.com`  
Repo: [Adhammansouri/portfolio](https://github.com/Adhammansouri/portfolio) · branch `main` · directory `public_html`

## Connected (hPanel)

1. **Advanced → Git** → GitHub OAuth (`Adhammansouri`)
2. Repository: **portfolio**
3. Branch: **main**
4. Deploy directory: **public_html**

## After every Git push (important)

Hostinger Git only copies files — it does **not** run Composer. After hPanel deploy or webhook auto-deploy, run on the server:

```bash
ssh hostinger-smash
cd ~/domains/paleturquoise-hedgehog-868163.hostingersite.com/public_html
bash deploy/hostinger.sh
```

Or from your PC:

```powershell
.\deploy\push-hostinger.ps1
```

(`push-hostinger.ps1` builds assets, pushes to GitHub, then SSH-runs `hostinger.sh`.)

## Auto-deploy webhook

In hPanel → **Git** → enable **Auto Deployment** and add the webhook URL to GitHub:

`Settings → Webhooks → Add webhook` (paste Hostinger URL, content type `application/json`, event: push).

After webhook fires, still run `bash deploy/hostinger.sh` via SSH (or use `push-hostinger.ps1`).

## Preserve `.env`

`.env` is gitignored and survives Git pulls. If missing after first deploy:

```bash
cp ~/portfolio-env-backup.env ~/domains/paleturquoise-hedgehog-868163.hostingersite.com/public_html/.env
```

## Custom domain

hPanel → **ربط الدومين** → point `adhammansour.com` (or similar), then update `APP_URL` in `.env`.
