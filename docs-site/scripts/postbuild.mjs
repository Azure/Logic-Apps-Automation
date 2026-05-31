// Postbuild: prepare the dist tree for Azure Static Web Apps upload.
//
// `astro.config.mjs` sets `base: '/docs'` and `outDir: './dist/docs'` so the
// built site lives under `dist/docs/…` and asset URLs match. The Azure Static
// Web Apps platform requires `staticwebapp.config.json` to sit at the *root*
// of the uploaded directory, so we copy it from the docs-site root into
// `dist/`. The deploy workflow then uploads `dist/`.

import { copyFile, access, mkdir, stat } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, '..');
const srcConfig = path.join(projectRoot, 'staticwebapp.config.json');
const destDir = path.join(projectRoot, 'dist');
const destConfig = path.join(destDir, 'staticwebapp.config.json');

try {
  await access(srcConfig, constants.R_OK);
} catch {
  console.error(`postbuild: missing source file ${srcConfig}`);
  process.exit(1);
}

const distStat = await stat(destDir).catch(() => null);
if (!distStat || !distStat.isDirectory()) {
  console.error(`postbuild: expected built output at ${destDir}; did 'astro build' run?`);
  process.exit(1);
}

await mkdir(destDir, { recursive: true });
await copyFile(srcConfig, destConfig);
console.log(`postbuild: copied ${path.relative(projectRoot, srcConfig)} → ${path.relative(projectRoot, destConfig)}`);
