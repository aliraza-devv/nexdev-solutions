import { defineConfig } from "vitest/config";
import path from "path";

// Minimal config: only used to unit test pure lib functions (no DOM,
// no React) so no plugin/environment setup beyond the @/ path alias
// that the rest of the repo already relies on.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
