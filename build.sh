#!/bin/bash
# Install backend dependencies
cd backend
npm install

# Build frontend
cd ../frontend
npm install
npm run build -- --skip-lint

echo "Setup complete!"