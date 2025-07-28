#!/bin/bash

# RK-FINFA PMIS Deployment Script - Auto-run Option 1 (Local Dev Server)

echo "RK-FINFA PMIS Deployment Options"
echo "================================"
echo ""
echo "Auto-selected: 1. Local Development Server"
echo "Starting local development server on port 8020..."

python3 -m http.server 8020 --bind 0.0.0.0
