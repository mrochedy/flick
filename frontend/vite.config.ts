import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      models: "/src/models",
      utils: "/src/utils",
      db: "/src/db",
      "@": "/src",
    },
  },
});
