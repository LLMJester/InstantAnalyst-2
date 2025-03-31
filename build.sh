#!/bin/bash
# Install backend dependencies
cd backend
npm install

# Install and build frontend
cd ../frontend
npm install
# Install Vue CLI explicitly if needed
npm install --save-dev @vue/cli-service

# Use the local path to vue-cli-service
echo "Running Vue build with full path..."
./node_modules/.bin/vue-cli-service build || npx vue-cli-service build

# Verify the build output
echo "Checking build output..."
ls -la dist || echo "dist directory not found!"

cd ..
echo "Setup complete!"