#!/bin/bash
# Install backend dependencies
cd backend
npm install

# Install and build frontend
cd ../frontend
npm install
# Run the build script defined in package.json
npm run build

# Verify the build output
echo "Checking build output..."
ls -la dist || echo "dist directory not found!"

cd ..
echo "Setup complete!"