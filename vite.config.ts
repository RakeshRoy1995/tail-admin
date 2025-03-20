import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://149.28.135.157:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
  resolve: {
    alias: {
      "@": path.resolve("src"),
      "@widgets": path.resolve("src/widgets"),
      "@features": path.resolve("src/features"),
      "@entities": path.resolve("src/entities"),
    },
  },
});

