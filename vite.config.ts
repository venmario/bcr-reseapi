import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      exclude: [
        ...configDefaults.exclude,
        "database/*",
        "express.d.ts",
        "index.ts"
      ]
    },
    testTimeout: 10000
  }
});
