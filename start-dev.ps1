$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ProjectRoot

$NodeDir = "C:\Program Files\nodejs"
$env:Path = "$NodeDir;$env:Path"

Write-Host "Starting Voyante dev server..." -ForegroundColor Green
Write-Host "Open http://localhost:3000 in your browser" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor DarkGray

& "$NodeDir\npm.cmd" run dev
