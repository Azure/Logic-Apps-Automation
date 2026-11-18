import { z } from 'astro/zod';

const plainText = z.string().trim().min(1).regex(/^[^<>\r\n]+$/, 'Use plain text, not HTML.');

function isPublicationDate(value) {
	const date = new Date(`${value}T00:00:00Z`);
	return /^\d{4}-\d{2}-\d{2}$/.test(value)
		&& !value.startsWith('0000')
		&& !Number.isNaN(date.getTime())
		&& date.toISOString().slice(0, 10) === value
		&& value <= new Date().toISOString().slice(0, 10);
}

function isArticleUrl(value) {
	if (/[\s\\]/u.test(value)) return false;
	try {
		const url = new URL(value);
		return url.protocol === 'https:'
			&& url.hostname === 'techcommunity.microsoft.com'
			&& url.href === value
			&& !url.username && !url.password && !url.port && !url.search && !url.hash
			&& (
				/^\/blog\/[^/]+\/[^/]+\/[1-9]\d*$/u.test(url.pathname)
				|| /^\/t5\/azure-integration-services-blog\/[^/]+\/ba-p\/[1-9]\d*$/u.test(url.pathname)
			);
	} catch {
		return false;
	}
}

export const blogSchema = z.object({
	id: z.string().regex(/^[1-9]\d*$/, 'Use the Tech Community article ID.'),
	title: plainText,
	url: z.string().refine(isArticleUrl, 'Use a canonical HTTPS Tech Community article URL.'),
	publishedAt: z.string().refine(isPublicationDate, 'Use a real, non-future date as YYYY-MM-DD.'),
	author: plainText,
	summary: plainText.max(400).regex(/^[^\[\]`*_#]+$/, 'Summaries must not contain Markdown.'),
	relatedDocs: z.array(z.object({
		label: plainText,
		href: z.string().regex(
			/^\/docs\/(?:[a-z0-9-]+\/)*(?:#[a-zA-Z0-9][a-zA-Z0-9._:-]*)?$/,
			'Use a /docs/ route with a trailing slash and optional fragment.',
		),
	}).strict()).max(2).default([]),
}).strict().superRefine((entry, context) => {
	if (!entry.url.endsWith(`/${entry.id}`)) {
		context.addIssue({ code: 'custom', path: ['url'], message: 'URL must end with the article ID.' });
	}
});

export const blogCatalogSchema = z.array(blogSchema).superRefine((entries, context) => {
	const ids = new Set();
	const urls = new Set();
	for (const [index, entry] of entries.entries()) {
		if (ids.has(entry.id)) {
			context.addIssue({ code: 'custom', path: [index, 'id'], message: 'Duplicate article ID.' });
		}
		// URI escapes are case-insensitive; do not allow alternate encodings of the same URL.
		const url = entry.url.replace(/%[0-9a-f]{2}/gi, (escape) => escape.toUpperCase());
		if (urls.has(url)) {
			context.addIssue({ code: 'custom', path: [index, 'url'], message: 'Duplicate article URL.' });
		}
		ids.add(entry.id);
		urls.add(url);
	}
});

export function parseBlogCatalog(text) {
	return blogCatalogSchema.parse(JSON.parse(text));
}
