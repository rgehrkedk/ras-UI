#!/usr/bin/env node
/*
  Quick component map: scans packages/react/src/components and prints a JSON map of
  component folders → files and top-level exports from index.ts (best-effort).
*/
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const COMPONENTS_DIR = path.join(
  ROOT,
  "packages",
  "react",
  "src",
  "components",
);

function getExports(indexPath) {
  try {
    const src = fs.readFileSync(indexPath, "utf8");
    const matches = [...src.matchAll(/export\s+\{([^}]+)\}/g)];
    const names = new Set();
    for (const m of matches) {
      const inner = m[1];
      inner
        .split(",")
        .forEach((t) => names.add(t.trim().split("\n")[0].split(" as ")[0]));
    }
    return [...names].filter(Boolean);
  } catch {
    return [];
  }
}

function main() {
  const out = {};
  if (!fs.existsSync(COMPONENTS_DIR)) {
    console.error("Missing components dir:", COMPONENTS_DIR);
    process.exit(1);
  }

  for (const name of fs.readdirSync(COMPONENTS_DIR)) {
    const full = path.join(COMPONENTS_DIR, name);
    if (!fs.statSync(full).isDirectory()) continue;
    const indexPath = path.join(full, "index.ts");
    const files = fs
      .readdirSync(full)
      .filter((f) => /\.(tsx?|css\.ts|stories\.tsx|test\.tsx)$/.test(f));
    out[name] = {
      files,
      exports: fs.existsSync(indexPath) ? getExports(indexPath) : [],
    };
  }

  console.log(JSON.stringify(out, null, 2));
}

main();
