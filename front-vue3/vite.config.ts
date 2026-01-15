import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // for dev and preview modes
  server: {
    proxy: {
      '/api/': {
        target: 'http://localhost:80', // This is the Nginx container (which proxies to Node.js)
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/"),
      },
    },
  },
});
