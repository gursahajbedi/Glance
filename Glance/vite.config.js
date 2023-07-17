import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      // include: [/linked-dep/, /node_modules/],
    }
  },
  server: {
    proxy: {
      'api/': {
        target: "https://glance-ed2v.onrender.com/",
        changeOrigin: true,
        secure: false,
      }
    }
  },
})


