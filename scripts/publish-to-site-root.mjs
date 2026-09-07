// Copies the built site from dist/ up into the deploy repo root.
//
// The deploy repo root is what GitHub Actions uploads to SiteGround. Copying dist over it
// without removing anything first means old hashed bundles are never deleted: the root
// assets/ folder had reached 27 files and 13 MB, nine copies each of index-*.js and the
// 872 KB NeuralCanvas3D chunk, none of which any page references.
//
// So assets/ is replaced wholesale rather than merged. Everything in it is generated build
// output with a content hash in the name, so nothing there is worth keeping. Files that
// live only at the root (.htaccess, .github, README, create-3d-website itself) are never
// touched, because this only writes the entries that exist in dist.
//
// Usage:
//   node scripts/publish-to-site-root.mjs --dry-run   show what would change
//   node scripts/publish-to-site-root.mjs             do it

import { cp, rm, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(projectRoot, 'dist');
const siteRoot = join(projectRoot, '..');

const dryRun = process.argv.includes('--dry-run');

async function countEntries(path) {
  if (!existsSync(path)) return 0;
  let total = 0;
  for (const entry of await readdir(path, { withFileTypes: true })) {
    total += entry.isDirectory() ? await countEntries(join(path, entry.name)) : 1;
  }
  return total;
}

async function sizeOf(path) {
  if (!existsSync(path)) return 0;
  let total = 0;
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const child = join(path, entry.name);
    total += entry.isDirectory() ? await sizeOf(child) : (await stat(child)).size;
  }
  return total;
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

async function main() {
  if (!existsSync(dist)) {
    console.error('No dist/. Run npm run build first.');
    process.exit(1);
  }

  const oldAssets = join(siteRoot, 'assets');
  const oldCount = await countEntries(oldAssets);
  const oldSize = await sizeOf(oldAssets);
  const newCount = await countEntries(join(dist, 'assets'));
  const newSize = await sizeOf(join(dist, 'assets'));

  console.log(`assets/ at site root : ${oldCount} files, ${mb(oldSize)}`);
  console.log(`assets/ in this build: ${newCount} files, ${mb(newSize)}`);
  console.log(`reclaimed            : ${mb(Math.max(0, oldSize - newSize))}`);

  const entries = await readdir(dist);
  console.log(`\nwould copy ${entries.length} top level entries from dist/ to the site root:`);
  console.log(`  ${entries.join(', ')}`);

  if (dryRun) {
    console.log('\ndry run, nothing written.');
    return;
  }

  await rm(oldAssets, { recursive: true, force: true });
  for (const entry of entries) {
    await cp(join(dist, entry), join(siteRoot, entry), { recursive: true, force: true });
  }
  console.log('\npublished. Review with git status, then commit and push to deploy.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
