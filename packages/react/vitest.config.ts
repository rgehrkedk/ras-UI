import { defineConfig } from "vitest/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { fileURLToPath } from "node:url";
import { dirname, resolve as resolvePath } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const mockStylesPath = resolvePath(__dirname, "src/test/__mocks__/styles.ts");

export default defineConfig({
  plugins: [
    // Mock all vanilla-extract style modules in tests to stable classnames
    {
      name: "mock-vanilla-extract-css",
      enforce: "pre",
      resolveId(id: string) {
        if (id.includes(".css.ts")) {
          return mockStylesPath;
        }
        return null;
      },
    },
    vanillaExtractPlugin(),
  ],
  test: {
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.ts", "src/**/*.{test,spec}.tsx"],
    globals: true,
    setupFiles: ["src/test/setup.ts"],
    reporters: "default",
  },
});
