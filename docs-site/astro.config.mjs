// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: process.env.DOCS_SITE_URL || undefined,
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
			favicon: '/favicon.svg',
			lastUpdated: true,
			sidebar: [
				{
					label: 'Getting started',
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
