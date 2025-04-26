import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true, // Enable global describe, it, expect
    environment: "jsdom", // Use jsdom for DOM testing
    setupFiles: "./src/_test_/setup.ts", // Path to your setup file
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    
  },
});