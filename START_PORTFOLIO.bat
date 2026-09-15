@echo off
title HARSHIT PORTFOLIO - LOCAL LAUNCHER
color 0A

echo ====================================================
echo   HARSHIT'S DEVELOPER PORTFOLIO - STARTING SERVER...
echo ====================================================
echo.

:: Change to the project directory
cd /d "%~dp0"

:: Automatically open browser after 2 seconds
powershell -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:3000'"

:: Start the local web server using npx serve / npm
echo [OK] Portfolio server starting at http://localhost:3000 ...
echo [OK] Opening default browser...
echo.
echo Press Ctrl+C to stop the server anytime.
echo.

npx -y serve . -l 3000

pause
