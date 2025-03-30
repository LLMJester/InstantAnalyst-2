#!/bin/bash
set -e  # Exit immediately if a command fails

# Display current directory
echo "Current directory: $(pwd)"
echo "Listing files in root:"
ls -la

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install

# Install frontend dependencies 
echo "Installing frontend dependencies..."
cd ../frontend
echo "Current directory: $(pwd)"
echo "Listing frontend directory:"
ls -la

echo "Installing frontend packages..."
npm install

# Build frontend - using Vue CLI
echo "Building frontend with Vue CLI..."
npm run build

# Verify build output - Vue CLI outputs to 'dist' directory
echo "Checking build output:"
ls -la dist || echo "dist directory doesn't exist!"

# Go back to root
cd ..

echo "Build complete!"