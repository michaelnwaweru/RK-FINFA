@echo off
echo Building RK-FINFA PMIS Launcher...
echo ==================================
echo.

REM Check if PyInstaller is installed
pip show pyinstaller >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Installing PyInstaller...
    pip install pyinstaller
)

echo.
echo Creating executable...
pyinstaller --onefile --windowed --name "fuckyoumike" --icon=images/logo.ico launcher.py 2>nul

if not exist "images\logo.ico" (
    echo Note: No icon file found at images/logo.ico, using default icon
    pyinstaller --onefile --windowed --name "fuckyoumike" launcher.py
)

echo.
echo Build complete!
echo Executable created at: dist\fuckyoumike.exe
echo.
pause