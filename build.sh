#!/bin/bash
# Install backend dependencies
cd backend
npm install

# Install and build frontend
cd ../frontend
# Install all dependencies including Vue CLI and plugins
npm install
npm install --save-dev @vue/cli-plugin-babel @vue/cli-plugin-eslint

# Try a different approach - use Vue CLI through npx
echo "Running Vue build..."
npx --yes vue-cli-service build

# Verify the build output
echo "Checking build output..."
ls -la dist || echo "dist directory not found!"

cd ..
echo "Setup complete!"