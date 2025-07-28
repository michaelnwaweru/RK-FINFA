@echo off
echo RK-FINFA PMIS Local Development Server
echo =====================================
echo.
echo Starting server on http://localhost:8020
echo Press Ctrl+C to stop the server
echo.

REM Try python3 first, then python, then py
where python3 >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    python3 -m http.server 8020 --bind 0.0.0.0
) else (
    where python >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        python -m http.server 8020 --bind 0.0.0.0
    ) else (
        py -3 -m http.server 8020 --bind 0.0.0.0
    )
)