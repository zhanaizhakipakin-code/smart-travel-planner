@echo off
cd /d "%~dp0"
set "NODE_DIR=C:\Program Files\nodejs"
set "PATH=%NODE_DIR%;%PATH%"
echo Starting Voyante dev server...
echo Open http://localhost:3000 in your browser
echo Press Ctrl+C to stop
call "%NODE_DIR%\npm.cmd" run dev
pause
