// Removes previous build output before a build.
//
// Vite is configured with emptyOutDir, but on this project it does not empty dist: a marker
// file placed in dist/assets survives a build, and passing --emptyOutDir explicitly makes no
// difference either. The likely cause is the non-ASCII path this repo lives under
// ("💻 Code"). Rather than fight it, the build cleans up after itself here.
//
// Left alone, every build leaves its hashed chunks behind. dist/assets had reached 62 files,
// including eight stale copies of the 872 KB NeuralCanvas3D chunk, and all of it gets copied
// to the site root and uploaded to SiteGround.
//
// Usage: node scripts/clean-dist.mjs

import { rm, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const targets = ['dist', 'dist-ssr'];

for (const target of targets) {
  const path = join(root, target);
  if (!existsSync(path)) continue;

  const before = await readdir(path).catch(() => []);
  await rm(path, { recursive: true, force: true });

  if (existsSync(path)) {
    // Better to stop than to build on top of stale output and ship it without noticing.
    console.error(`clean-dist: could not remove ${target}. Delete it by hand and re-run.`);
    process.exit(1);
  }
  console.log(`clean-dist: removed ${target} (${before.length} top level entries)`);
}
