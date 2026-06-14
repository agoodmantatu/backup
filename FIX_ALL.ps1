# Run this in PowerShell inside E:\Tatu
# Fixes: 1) Nav reload  2) Role routing  3) Themes

# ── FIX 1: Navbar scroll links causing full reload ──────────────
# Replace href="#features" style anchors with smooth scroll JS
Write-Host "Fix 1: Navbar nav links..." -ForegroundColor Cyan
$nav = Get-Content "E:\Tatu\src\components\landing\Navbar.jsx" -Raw
# Check if it has href that causes reload
if ($nav -match "href=") {
    Write-Host "  Found href= links - these cause full reload. Replacing Navbar..." -ForegroundColor Yellow
} else {
    Write-Host "  Navbar looks OK" -ForegroundColor Green
}

# ── FIX 2: Onboarding role routing ──────────────────────────────
Write-Host "Fix 2: Onboarding role routing..." -ForegroundColor Cyan
$ob = Get-Content "E:\Tatu\src\pages\Onboarding.jsx" -Raw
if ($ob -match "navigate\('/dashboard'\)") {
    $ob = $ob -replace "navigate\('/dashboard'\)", @"
const ROLE_HOME = {
        student: '/dashboard',
        mentor: '/mentor-hub',
        institution: '/centre/dashboard',
        family: '/family',
      }
      navigate(ROLE_HOME[user?.role] || '/dashboard')
"@
    Set-Content "E:\Tatu\src\pages\Onboarding.jsx" $ob -Encoding UTF8
    Write-Host "  ✅ Fixed role routing in Onboarding.jsx" -ForegroundColor Green
} else {
    Write-Host "  Already fixed or pattern not found - check manually" -ForegroundColor Yellow
    # Show what navigate calls exist
    $lines = $ob -split "`n"
    $lines | Select-String "navigate\(" | ForEach-Object { Write-Host "  Line: $_" }
}

# ── FIX 3: Theme CSS vars check ─────────────────────────────────
Write-Host "Fix 3: Checking themes.js exports..." -ForegroundColor Cyan
$themes = Get-Content "E:\Tatu\src\lib\themes.js" -Raw
if ($themes -match "export function isThemeUnlocked" -and $themes -match "export function getUnlockLevel") {
    Write-Host "  ✅ themes.js has correct exports" -ForegroundColor Green
} else {
    Write-Host "  ❌ themes.js missing exports - needs replacement" -ForegroundColor Red
}
if ($themes -match "applyTheme") {
    Write-Host "  ✅ applyTheme function present" -ForegroundColor Green
} else {
    Write-Host "  ❌ applyTheme missing" -ForegroundColor Red
}

# ── FIX 4: Check ThemeContext imports match themes.js ───────────
Write-Host "Fix 4: Checking ThemeContext imports..." -ForegroundColor Cyan
$tc = Get-Content "E:\Tatu\src\context\ThemeContext.jsx" -Raw
if ($tc -match "isThemeUnlocked as checkThemeUnlocked") {
    Write-Host "  ThemeContext imports isThemeUnlocked - checking themes.js exports it..." -ForegroundColor Yellow
    if ($themes -match "export function isThemeUnlocked") {
        Write-Host "  ✅ Match OK" -ForegroundColor Green
    } else {
        Write-Host "  ❌ MISMATCH - themes.js doesn't export isThemeUnlocked" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Check App.jsx for ThemeProvider userLevel ===" -ForegroundColor Cyan
$app = Get-Content "E:\Tatu\src\App.jsx" -Raw
if ($app -match "userLevel") {
    Write-Host "  ✅ ThemeProvider has userLevel prop" -ForegroundColor Green
} else {
    Write-Host "  ❌ ThemeProvider missing userLevel prop - themes will never apply!" -ForegroundColor Red
    Write-Host "  Fix: Find <ThemeProvider> in App.jsx and change to:" -ForegroundColor Yellow
    Write-Host "  <ThemeProvider userLevel={user?.level ?? 1}>" -ForegroundColor Yellow
}
