import { readFile } from 'node:fs/promises';
import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { blogSchema, parseBlogCatalog } from './data/blogs.schema.mjs';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
	blogs: defineCollection({
		// Validate the whole local catalog before Astro indexes IDs, preventing silent overwrites.
		loader: async () => parseBlogCatalog(
			await readFile(new URL('./data/blogs.json', import.meta.url), 'utf-8'),
		),
		schema: blogSchema,
	}),
};
