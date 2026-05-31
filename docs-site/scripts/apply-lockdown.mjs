#!/usr/bin/env node
// Mutates dist/staticwebapp.config.json to add an Azure Front Door
// `forwardingGateway` block, so the SWA's default `*.azurestaticapps.net`
// hostname returns 403 for any request that did not come through our AFD
// profile. Requires the SWA to be on Standard SKU — Free SKU silently
// ignores `forwardingGateway`.
//
// Usage (run from repo root after the artifact has been downloaded to ./dist):
//   node docs-site/scripts/apply-lockdown.mjs canary
//   node docs-site/scripts/apply-lockdown.mjs prod
//
// Targets are keyed by AFD profile and custom domain — keep this list in
// sync with the AFD `frontDoorId` values shown in `docs-site/INFRA.md`.

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const TARGETS = {
  canary: {
    // otto-portal-canary-afd
    frontDoorId: '2ca9cd4d-6df1-47b7-b8e2-24ba2bd17727',
    customDomain: 'otto-canary.azure.com',
  },
  prod: {
    // otto-portal-afd
    frontDoorId: 'c1504f11-9bfe-40e3-b58f-923f88dc0689',
    customDomain: 'auto.azure.com',
  },
};

const target = process.argv[2];
if (!target || !TARGETS[target]) {
  console.error(`usage: apply-lockdown.mjs <${Object.keys(TARGETS).join('|')}>`);
  process.exit(2);
}

const configPath = resolve(process.cwd(), 'dist/staticwebapp.config.json');
const cfg = JSON.parse(readFileSync(configPath, 'utf8'));

cfg.forwardingGateway = {
  requiredHeaders: { 'X-Azure-FDID': TARGETS[target].frontDoorId },
  allowedForwardedHosts: [TARGETS[target].customDomain],
};

writeFileSync(configPath, JSON.stringify(cfg, null, 2) + '\n', 'utf8');
console.log(
  `apply-lockdown: ${target} — direct *.azurestaticapps.net hits will now 403; ` +
    `only requests fronted by AFD (X-Azure-FDID=${TARGETS[target].frontDoorId}, ` +
    `Host=${TARGETS[target].customDomain}) pass through.`,
);
