# Run in PowerShell inside E:\Tatu
# Fixes all 4 role dashboards returning blank when user=null on first render

$files = @(
    "src\pages\Dashboard.jsx",
    "src\pages\mentor\MentorHub.jsx",
    "src\pages\centre\CentreDashboard.jsx",
    "src\pages\family\FamilyHub.jsx"
)

foreach ($file in $files) {
    $path = "E:\Tatu\$file"
    if (-not (Test-Path $path)) {
        Write-Host "SKIP (not found): $file" -ForegroundColor Yellow
        continue
    }
    $c = Get-Content $path -Raw

    # Replace: if (!user) return null
    # With:    if (loading) return <Loader/>  then if (!user) navigate to login
    if ($c -match "if \(!user\) return null") {
        $c = $c -replace `
            "const \{ user \} = useAuth\(\)", `
            "const { user, loading } = useAuth()`
        $c = $c -replace `
            "if \(!user\) return null", `
            "if (loading) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#1E3A5F,#0F2140)'}}><div style={{color:'#D4AF37',fontSize:18,fontFamily:'Poppins,sans-serif'}}>Loading...</div></div>`r`n  if (!user) return null"
        Set-Content $path $c -Encoding UTF8
        Write-Host "✅ Fixed: $file" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Pattern not found in: $file" -ForegroundColor Yellow
        # Show what guard exists
        $lines = $c -split "`n"
        $lines | Select-String "user\)" | Select-Object -First 5 | ForEach-Object { Write-Host "   $_" }
    }
}

Write-Host ""
Write-Host "Done. Run: npm run dev" -ForegroundColor Cyan
