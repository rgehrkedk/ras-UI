#!/usr/bin/env node
/* Lightweight bundle size check without external deps.
 * Checks built artifact sizes for @ras-ui/react after CI build.
 */
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const files = ["packages/react/dist/index.mjs", "packages/react/dist/index.js"];

// Reasonable initial thresholds (in bytes)
const THRESHOLDS = {
  raw: 120 * 1024, // 120 KB raw
  gzip: 40 * 1024, // 40 KB gzip
};

function pretty(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

let found = false;
let failed = false;

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  found = true;
  const buf = fs.readFileSync(file);
  const gzip = zlib.gzipSync(buf);

  const rawSize = buf.length;
  const gzipSize = gzip.length;

  // eslint-disable-next-line no-console
  console.log(
    `Size check for ${file}: raw=${pretty(rawSize)}, gzip=${pretty(gzipSize)}`,
  );

  if (rawSize > THRESHOLDS.raw || gzipSize > THRESHOLDS.gzip) {
    // eslint-disable-next-line no-console
    console.error(
      `❌ Size limit exceeded: raw>${pretty(THRESHOLDS.raw)} or gzip>${pretty(THRESHOLDS.gzip)}`,
    );
    failed = true;
  }
}

if (!found) {
  // eslint-disable-next-line no-console
  console.log(
    "ℹ️ No built artifacts found to size-check. Ensure build ran first.",
  );
  process.exit(0);
}

process.exit(failed ? 1 : 0);
