@echo off
echo RK-FINFA PMIS Docker Development Server
echo ======================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Docker is not running!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo Checking Docker installation...
docker --version
docker-compose --version

echo.
echo Building and starting Docker container...
echo This may take a few minutes on first run...
echo.

REM Use docker compose (new syntax) if available, otherwise docker-compose
where docker compose >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    docker compose up --build
) else (
    docker-compose up --build
)