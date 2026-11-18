// news-image-18nov — entry program for the make.fun "Sum up 18 November's
// world news in one image" bounty (news-image-20261118).
//
// The entry is a single static image, entry.png, sitting beside this file.
// This program copies it into the grader's output directory, unchanged.
// It is fully deterministic: no network, no clock, no randomness — the
// bytes written depend only on the entry.png in this repository.
//
// Run it with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1024 * 1024; // 1 MiB — the competition's file-size cap.

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./out";
const target = join(outDir, "entry.png");

// Refuse an oversized entry instead of silently shipping a rejected file.
// (The size is checked before any output directory is created, so a bad
// entry leaves no stale output behind for the grader to pick up.)
const size = statSync(source).size;
if (size > MAX_BYTES) {
  throw new Error(
    `entry.png is ${size} bytes, over the 1 MiB limit (${MAX_BYTES} bytes).`,
  );
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
console.log(`Wrote ${target} (${size} bytes).`);
