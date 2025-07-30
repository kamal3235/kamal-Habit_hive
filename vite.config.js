import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom", // Back to jsdom for proper testing
    globals: true,
    setupFiles: ["./src/test/setup.js"],
  },
});
