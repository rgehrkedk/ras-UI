// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

// @ts-check
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: ["./tsconfig.json", "./packages/*/tsconfig.json"],
        tsconfigRootDir: ".",
      },
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        exports: "readonly",
        global: "readonly",
        module: "readonly",
        require: "readonly",
        document: "readonly",
        window: "readonly",
        navigator: "readonly",
        HTMLElement: "readonly",
        HTMLButtonElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLDivElement: "readonly",
        MediaQueryListEvent: "readonly",
        FrameRequestCallback: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        ResizeObserverCallback: "readonly",
        IntersectionObserverCallback: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      import: importPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      // ESLint recommended rules
      ...js.configs.recommended.rules,

      // TypeScript recommended rules
      ...tsPlugin.configs.recommended.rules,

      // React rules
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // React Hooks rules
      ...reactHooksPlugin.configs.recommended.rules,

      // Accessibility rules (jsx-a11y)
      ...jsxA11yPlugin.configs.recommended.rules,
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/interactive-supports-focus": "error",
      "jsx-a11y/label-has-associated-control": "error",
      "jsx-a11y/no-redundant-roles": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-redeclare": "error",
      "@typescript-eslint/no-duplicate-type-constituents": "error",
      "@typescript-eslint/prefer-as-const": "error",

      // Import rules
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-unresolved": "error",
      "import/no-unused-modules": "warn",
    },
  },
  {
    ignores: [
      "dist/",
      "node_modules/",
      ".next/",
      "storybook-static/",
      "**/*.config.js",
      "**/*.config.ts",
    ],
  },
  // Stories: relax a few rules for examples/docs
  {
    files: ["**/*.stories.tsx"],
    rules: {
      "react/no-unescaped-entities": "off",
      "no-undef": "off",
      "import/order": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "storybook/no-redundant-story-name": "warn",
    },
  },
  // Tests: lighten up constraints for test authors
  {
    files: ["**/*.test.ts", "**/*.test.tsx"],
    rules: {
      "import/order": "off",
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
    },
  },
  ...storybook.configs["flat/recommended"],
];
