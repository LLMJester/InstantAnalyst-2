#!/bin/bash
set -e  # Exit immediately if a command fails

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

echo "Package.json contents:"
cat package.json

echo "Installing frontend packages..."
npm install

# Show installed packages
echo "Showing installed node_modules:"
ls -la node_modules/.bin

# Build frontend - use npx to ensure vue-cli-service is found
echo "Building frontend with npx..."
npx vue-cli-service build

# Verify build output
echo "Checking build output directory:"
ls -la || echo "Cannot list directory"
echo "Checking dist directory contents (if it exists):"
ls -la dist || echo "dist directory doesn't exist!"

# Go back to root
cd ..

echo "Build complete!"