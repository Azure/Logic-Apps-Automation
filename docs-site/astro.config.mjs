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
				'Build, automate, and ship workflows with a visual designer, an AI assistant, and a connectors library.',
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
					items: [
						{ label: 'About Logic Apps Automation', slug: 'getting-started/introduction' },
						{ label: 'Build your first workflow', slug: 'getting-started/quickstart' },
						{ label: 'Pricing and free grants', slug: 'getting-started/pricing' },
						{ label: 'Set up an environment', slug: 'getting-started/setup' },
					],
				},
				{
					label: 'Concepts',
					items: [
						{ label: 'Environments and applications', slug: 'features/projects-and-applications' },
						{ label: 'Permissions', slug: 'features/permissions' },
						{ label: 'Managed and built-in connectors', slug: 'features/connectors' },
					],
				},
				{
					label: 'Workflows',
					items: [
						{
							label: 'Ways to build workflows',
							collapsed: true,
							items: [
								{ label: 'From scratch', slug: 'getting-started/quickstart' },
								{ label: 'From templates', slug: 'guides/templates' },
								{ label: 'With the AI assistant', slug: 'features/ai-assistant' },
							],
						},
						{
							label: 'Build workflows',
							collapsed: true,
							items: [
								{ label: 'Designer, nodes and branches', slug: 'features/visual-designer' },
								{ label: 'Workflow concepts and expressions', slug: 'features/workflows' },
							],
						},
						{
							label: 'Manage workflows',
							collapsed: true,
							items: [
								{ label: 'Runs and monitoring', slug: 'features/runs-and-monitoring' },
							],
						},
					],
				},
				{
					label: 'Templates',
					collapsed: true,
					items: [
						{ label: 'Create, import and share templates', slug: 'guides/templates' },
					],
				},
				{
					label: 'Agents',
					collapsed: true,
					items: [
						{ label: 'Choose and orchestrate agents', slug: 'features/agents' },
						{ label: 'Foundry Hosted agent', slug: 'features/foundry-hosted-agents' },
						{ label: 'Create a Foundry Hosted agent', slug: 'guides/create-foundry-hosted-agents' },
					],
				},
				{
					label: 'Sandbox',
					collapsed: true,
					items: [
						{ label: 'Overview', slug: 'features/sandboxes' },
						{ label: 'Sandbox setup overview', slug: 'guides/create-sandboxes' },
					],
				},
				{
					label: 'Tools',
					collapsed: true,
					items: [
						{ label: 'Tools for agents', slug: 'guides/agent-tools' },
					],
				},
				{
					label: 'Knowledge',
					collapsed: true,
					items: [
						{ label: 'Overview', slug: 'features/knowledge-bases' },
						{ label: 'Knowledge setup overview', slug: 'guides/create-knowledge-bases' },
					],
				},
				{
					label: 'Connectors',
					collapsed: true,
					items: [
						{ label: 'GitHub', slug: 'guides/github-connector' },
						{ label: 'Azure DevOps', slug: 'guides/azure-devops-connectors' },
					],
				},
				{
					label: 'Scenarios',
					collapsed: true,
					items: [
						{ label: 'Agent scenarios', slug: 'guides/agent-scenarios' },
					],
				},
				{
					label: 'Demos',
					collapsed: true,
					items: [{ autogenerate: { directory: 'demos' } }],
				},
				{
					label: 'Release notes',
					items: [{ autogenerate: { directory: 'release-notes' } }],
				},
				{
					label: 'Support',
					items: [
						{ label: 'Troubleshoot', slug: 'getting-started/troubleshoot' },
						{ autogenerate: { directory: 'support' } },
					],
				},
			],
		}),
	],
});
