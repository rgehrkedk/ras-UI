import { defineConfig } from "vitest/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  plugins: [vanillaExtractPlugin()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.ts", "src/**/*.{test,spec}.tsx"],
    globals: true,
    setupFiles: ["src/test/setup.ts"],
    reporters: "default",
  },
});
