# Adham Mansour Portfolio — push to Git then deploy on Hostinger via SSH
# Usage:  .\deploy\push-hostinger.ps1
# Set $RemotePath after first hPanel site creation (see deploy/README-hostinger.md)

param(
    [string]$Branch = "main",
    [string]$Remote = "origin",
    [string]$SshHost = "hostinger-smash",
    [string]$RemotePath = "/home/u358087675/domains/paleturquoise-hedgehog-868163.hostingersite.com/public_html"
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

if ($RemotePath -match "PORTFOLIO-DOMAIN") {
    Write-Host "ERROR: Set -RemotePath to your portfolio domain folder." -ForegroundColor Red
    Write-Host "  Example: -RemotePath '/home/u358087675/domains/lavender-ox-123.hostingersite.com/public_html'" -ForegroundColor Yellow
    exit 1
}

Write-Host "==> Frontend build" -ForegroundColor Cyan
npm run build
if (-not (Test-Path "public\build\manifest.json")) {
    Write-Host "ERROR: public/build/manifest.json missing." -ForegroundColor Red
    exit 1
}

$buildDirty = git status --porcelain public/build 2>$null
if ($buildDirty) {
    Write-Host "==> Staging public/build" -ForegroundColor Cyan
    git add -f public/build
    git commit -m "build: vite production assets" 2>$null
}

Write-Host "==> Git push ($Remote $Branch)" -ForegroundColor Cyan
git push $Remote $Branch

Write-Host "==> SSH deploy" -ForegroundColor Cyan
$repo = "https://github.com/Adhammansouri/portfolio.git"
$cmd = @"
cd $RemotePath && \
if [ ! -d .git ]; then git clone $repo .; else git fetch $Remote $Branch && git reset --hard $Remote/$Branch; fi && \
mkdir -p bootstrap/cache storage/framework/{cache,sessions,views} storage/logs database && \
bash deploy/hostinger.sh
"@
ssh $SshHost $cmd

Write-Host "==> Done" -ForegroundColor Green
