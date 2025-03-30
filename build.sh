#!/bin/bash
# Install backend dependencies
cd backend
npm install

# Install and build frontend
cd ../frontend
npm install
npx vue-cli-service build || npm run build

echo "Setup complete!"