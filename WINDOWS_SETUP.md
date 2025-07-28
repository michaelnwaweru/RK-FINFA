# Windows Setup Guide for RK-FINFA PMIS

## Quick Start - Using the Launcher (Easiest)

1. Download the latest release from GitHub
2. Run `fuckyoumike.exe`
3. The launcher will automatically:
   - Detect if Docker or Python is installed
   - Start the server using the best available method
   - Open your browser to http://localhost:8020

## Building the Launcher from Source

If you want to build the .exe file yourself:

1. Install Python 3.7+ from [python.org](https://www.python.org/downloads/)
2. Clone the repository
3. Run `build-exe.bat`
4. Find the executable in the `dist` folder

## Prerequisites

### Option 1: Using Python (Simplest)
- Python 3.7+ installed from [python.org](https://www.python.org/downloads/)
- During installation, check "Add Python to PATH"

### Option 2: Using Docker
- Docker Desktop for Windows from [docker.com](https://www.docker.com/products/docker-desktop/)
- Enable WSL 2 backend during installation

## Running the Application

### Method 1: Direct Python Server (Recommended for development)

1. Open Command Prompt or PowerShell
2. Navigate to the project directory:
   ```cmd
   cd path\to\RK-FINFA-PMIS
   ```
3. Run the batch file:
   ```cmd
   run.bat
   ```
4. Open your browser and go to: http://localhost:8020

### Method 2: Using Docker

1. Open Command Prompt or PowerShell as Administrator
2. Navigate to the project directory:
   ```cmd
   cd path\to\RK-FINFA-PMIS
   ```
3. Run the Docker batch file:
   ```cmd
   run-docker.bat
   ```
4. Wait for the container to build and start
5. Open your browser and go to: http://localhost:8020

## Stopping the Server

- **For Python server**: Press `Ctrl+C` in the command window
- **For Docker**: Press `Ctrl+C` in the command window, then run:
  ```cmd
  docker-compose down
  ```

## Troubleshooting

### Python not found
- Ensure Python is installed and added to PATH
- Try using `py` instead of `python` in the batch file

### Docker issues
- Ensure Docker Desktop is running
- Check if virtualization is enabled in BIOS
- Run Docker Desktop as Administrator

### Port 8020 already in use
- Change the port in `run.bat` or `docker-compose.yml`
- Or find and stop the process using port 8020:
  ```cmd
  netstat -ano | findstr :8020
  taskkill /PID <PID_NUMBER> /F
  ```