#!/usr/bin/env python3
"""
RK-FINFA PMIS Launcher
Automatically detects and runs the application using the best available method
"""

import os
import sys
import subprocess
import webbrowser
import time
import socket
from pathlib import Path

def is_port_open(port=8020, host='localhost'):
    """Check if port is already in use"""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex((host, port))
    sock.close()
    return result == 0

def check_docker():
    """Check if Docker is installed and running"""
    try:
        result = subprocess.run(['docker', 'info'], 
                              capture_output=True, 
                              text=True, 
                              shell=True)
        return result.returncode == 0
    except:
        return False

def check_python():
    """Check if Python is available"""
    for cmd in ['python3', 'python', 'py']:
        try:
            result = subprocess.run([cmd, '--version'], 
                                  capture_output=True, 
                                  text=True, 
                                  shell=True)
            if result.returncode == 0:
                return cmd
        except:
            continue
    return None

def run_docker():
    """Run using Docker"""
    print("Starting Docker container...")
    print("This may take a few minutes on first run...")
    
    # Check for new docker compose syntax first
    compose_cmd = None
    try:
        result = subprocess.run(['docker', 'compose', 'version'], 
                              capture_output=True, 
                              shell=True)
        if result.returncode == 0:
            compose_cmd = ['docker', 'compose', 'up', '--build']
    except:
        pass
    
    if not compose_cmd:
        compose_cmd = ['docker-compose', 'up', '--build']
    
    process = subprocess.Popen(compose_cmd, shell=True)
    return process

def run_python(python_cmd):
    """Run using Python HTTP server"""
    print(f"Starting Python HTTP server using {python_cmd}...")
    
    cmd = [python_cmd, '-m', 'http.server', '8020', '--bind', '0.0.0.0']
    process = subprocess.Popen(cmd, shell=True)
    return process

def main():
    print("=" * 50)
    print("RK-FINFA PMIS Launcher")
    print("=" * 50)
    print()
    
    # Change to script directory
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    # Check if server is already running
    if is_port_open():
        print("Server is already running!")
        print("Opening browser...")
        webbrowser.open('http://localhost:8020')
        input("\nPress Enter to exit...")
        return
    
    # Determine best method to run
    process = None
    
    if check_docker():
        print("Docker detected!")
        choice = input("Use Docker? (recommended) [Y/n]: ").strip().lower()
        if choice != 'n':
            process = run_docker()
    
    if not process:
        python_cmd = check_python()
        if python_cmd:
            print(f"Python detected: {python_cmd}")
            process = run_python(python_cmd)
        else:
            print("ERROR: Neither Docker nor Python found!")
            print("\nPlease install one of the following:")
            print("1. Docker Desktop: https://www.docker.com/products/docker-desktop/")
            print("2. Python 3.7+: https://www.python.org/downloads/")
            input("\nPress Enter to exit...")
            return
    
    # Wait for server to start
    print("\nWaiting for server to start", end="")
    for i in range(30):  # Wait up to 30 seconds
        if is_port_open():
            print("\n\nServer started successfully!")
            break
        print(".", end="", flush=True)
        time.sleep(1)
    else:
        print("\n\nWarning: Server may not have started properly.")
    
    # Open browser
    print("Opening browser...")
    webbrowser.open('http://localhost:8020')
    
    print("\n" + "=" * 50)
    print("Server is running at: http://localhost:8020")
    print("Press Ctrl+C to stop the server")
    print("=" * 50)
    
    try:
        process.wait()
    except KeyboardInterrupt:
        print("\n\nShutting down server...")
        process.terminate()
        
        # If using Docker, also run docker-compose down
        if check_docker() and 'docker' in str(process.args):
            print("Stopping Docker containers...")
            subprocess.run(['docker-compose', 'down'], shell=True)
    
    print("\nServer stopped.")
    input("Press Enter to exit...")

if __name__ == '__main__':
    main()