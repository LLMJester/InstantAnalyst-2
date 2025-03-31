module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  lintOnSave: false, // Disable linting
  chainWebpack: config => {
    config.plugins.delete('eslint'); // Remove the ESLint plugin
  }
}