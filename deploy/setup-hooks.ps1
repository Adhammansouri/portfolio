# Install git hooks for this repository (run once after clone).
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

git config core.hooksPath .githooks

if ($IsWindows -or $env:OS -match "Windows") {
    icacls ".githooks\pre-push" /grant Everyone:RX | Out-Null
}

Write-Host "Git hooks installed (.githooks/pre-push will build assets before pushing main)." -ForegroundColor Green
