#!/usr/bin/env node
/**
 * Codemod: replace Storybook renderer imports with the framework package.
 *
 * - Replaces any "from '@storybook/react'" with "from '@storybook/react-vite'"
 * - Targets all *.stories.tsx files in the repo (safe text replace)
 *
 * Usage:
 *   node scripts/codemods/update-storybook-imports.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // skip node_modules and dist
      if (
        entry.name === "node_modules" ||
        entry.name === "dist" ||
        entry.name === ".turbo"
      )
        continue;
      walk(full, out);
    } else if (entry.isFile() && /\.stories\.tsx$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function run() {
  const files = walk(ROOT);
  let changed = 0;
  for (const file of files) {
    const src = fs.readFileSync(file, "utf8");
    if (src.includes("'@storybook/react'")) {
      const next = src.replaceAll(
        "'@storybook/react'",
        "'@storybook/react-vite'",
      );
      if (next !== src) {
        fs.writeFileSync(file, next, "utf8");
        console.log("Updated:", path.relative(ROOT, file));
        changed++;
      }
    }
    if (src.includes('"@storybook/react"')) {
      const next = fs
        .readFileSync(file, "utf8")
        .replaceAll('"@storybook/react"', '"@storybook/react-vite"');
      if (next !== src) {
        fs.writeFileSync(file, next, "utf8");
        console.log("Updated:", path.relative(ROOT, file));
        changed++;
      }
    }
  }
  console.log(`\nCodemod complete. Files updated: ${changed}`);
}

run();
