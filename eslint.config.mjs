import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig({
  extends: [js.configs.recommended, tseslint.configs.recommended],
  languageOptions: {
    parserOptions: {
      project: "./tsconfig.json",
    },
  },
  files: ["**/*.{js,ts}"],
  ignores: ["node_modules/**", "dist/**", "src/antlr/**", "vitest.config.ts"],
  rules: {
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "none",
      },
    ],
  },
});
