#!/bin/bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies and build
cd ../frontend

# Create a minimal public/index.html if it doesn't exist
mkdir -p public
if [ ! -f "public/index.html" ]; then
  echo "Creating minimal index.html template..."
  cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title>InstantAnalyst</title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but this app doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
EOF
fi

# Create a minimal main.js if it doesn't exist
if [ ! -f "src/main.js" ]; then
  mkdir -p src
  echo "Creating minimal main.js..."
  cat > src/main.js << 'EOF'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
EOF
fi

# Install dependencies
npm install

# Create a Vue config file if needed
if [ ! -f "vue.config.js" ]; then
  echo "Creating Vue config file..."
  cat > vue.config.js << 'EOF'
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}
EOF
fi

# Ensure correct api URL for production
sed -i 's|apiBaseUrl: .*|apiBaseUrl: process.env.NODE_ENV === "production" ? "" : "http://localhost:3000",|' src/App.vue

# Install necessary Vue packages
npm install --save-dev @vue/cli-service @vue/cli-plugin-babel @vue/cli-plugin-eslint

# Create babel.config.js if it doesn't exist
if [ ! -f "babel.config.js" ]; then
  echo "Creating babel.config.js..."
  cat > babel.config.js << 'EOF'
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
EOF
fi

# Build with verbose output
echo "Building Vue app..."
./node_modules/.bin/vue-cli-service build --mode production --no-clean --verbose

# Verify build output
echo "Checking build output..."
ls -la dist || echo "dist directory not found!"

cd ..
echo "Setup complete!"