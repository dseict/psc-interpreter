import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Enable Jest-like global test APIs (describe, test, expect)
    globals: true,
    environment: "node",
    watch: false,
  },
});
