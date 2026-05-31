// Postbuild: prepare the dist tree for Azure Static Web Apps upload.
//
// `astro.config.mjs` sets `base: '/docs'` and `outDir: './dist/docs'` so the
// built site lives under `dist/docs/…` and asset URLs match. The Azure Static
// Web Apps platform requires `staticwebapp.config.json` to sit at the *root*
// of the uploaded directory, so we copy it from the docs-site root into
// `dist/`. The deploy workflow then uploads `dist/`.
//
// SWA also validates that `index.html` exists at the upload root *before*
// applying `staticwebapp.config.json` routes. The actual site lives under
// `/docs/`, so we write a minimal stub `dist/index.html` purely to pass that
// validator. At runtime, the config's `/ → /docs/` 301 redirect fires before
// the stub is ever served.

import { copyFile, access, mkdir, stat, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, '..');
const srcConfig = path.join(projectRoot, 'staticwebapp.config.json');
const destDir = path.join(projectRoot, 'dist');
const destConfig = path.join(destDir, 'staticwebapp.config.json');
const destIndex = path.join(destDir, 'index.html');

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

const stubHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Otto Docs</title>
    <meta http-equiv="refresh" content="0; url=/docs/" />
    <link rel="canonical" href="/docs/" />
    <meta name="robots" content="noindex" />
  </head>
  <body>
    <p>Redirecting to <a href="/docs/">/docs/</a>.</p>
  </body>
</html>
`;
await writeFile(destIndex, stubHtml, 'utf8');
console.log(`postbuild: wrote stub ${path.relative(projectRoot, destIndex)} (SWA validator requirement; runtime 301s to /docs/)`);
