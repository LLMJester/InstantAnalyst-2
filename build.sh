#!/bin/bash
set -e

# Install frontend dependencies and build manually
echo "Manually installing and building frontend..."
cd frontend
npm install
# Install Vue CLI globally
npm install -g @vue/cli
# Run build with full path
echo "Running Vue build with full path..."
./node_modules/.bin/vue-cli-service build

# Install backend dependencies
echo "Installing backend dependencies..."
cd ../backend
npm install

# Debug what we have
echo "Checking if frontend build succeeded:"
ls -la ../frontend/dist || echo "No dist folder found"

echo "Build completed!"