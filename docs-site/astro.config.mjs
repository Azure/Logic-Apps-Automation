// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { remarkBasePrefix } from './scripts/remarkBasePrefix.mjs';

// The site lives behind Azure Front Door at `auto.azure.com/docs/*`. Two
// things have to line up:
//   1. `base: '/docs'` makes Astro emit links and asset URLs under `/docs/…`
//      so they match the AFD route pattern.
//   2. `outDir: './dist/docs'` puts the actual files at `dist/docs/…` so the
//      file paths the SWA serves match the URLs in the HTML.
// `scripts/postbuild.mjs` then hoists the SWA route config back to `dist/`
// (where SWA requires it) before we hand the directory off to the deploy
// action. The canary SWA serves the same build and uses a `/ → /docs/`
// redirect in `staticwebapp.config.json` to keep its bare-root URL working.
// `scripts/remarkBasePrefix.mjs` rewrites plain markdown `[text](/foo)` links
// to `[text](/docs/foo)` at build time so content authors don't have to
// remember the base prefix in every page.
const DOCS_BASE = '/docs';

// https://astro.build/config
export default defineConfig({
	site: process.env.DOCS_SITE_URL || undefined,
	base: DOCS_BASE,
	outDir: './dist/docs',
	trailingSlash: 'always',
	markdown: {
		remarkPlugins: [remarkBasePrefix({ base: DOCS_BASE })],
	},
	integrations: [
		starlight({
			title: 'Docs',
			description:
				'Build, automate, and ship workflows with a visual designer, an AI assistant, and a library of connectors.',
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: false,
				alt: 'Workflows logo',
			},
			// Starlight's `favicon` is rendered through Astro's base-prefixer,
			// so this becomes `<link href="/docs/favicon.svg">` at build
			// time. The file is at `public/favicon.svg` → `dist/docs/favicon.svg`.
			favicon: '/favicon.svg',
			lastUpdated: true,
			sidebar: [
				{
					label: 'Get started',
					items: [{ autogenerate: { directory: 'getting-started' } }],
				},
				{
					label: 'Demos',
					items: [{ autogenerate: { directory: 'demos' } }],
				},
				{
					label: 'Features',
					items: [{ autogenerate: { directory: 'features' } }],
				},
				{
					label: 'Guides',
					collapsed: true,
					items: [{ autogenerate: { directory: 'guides' } }],
				},
				{
					label: 'Reference',
					collapsed: true,
					items: [{ autogenerate: { directory: 'reference' } }],
				},
				{
					label: 'Release notes',
					items: [{ autogenerate: { directory: 'release-notes' } }],
				},
				{
					label: 'Support',
					items: [{ autogenerate: { directory: 'support' } }],
				},
			],
		}),
	],
});
