import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { blogCatalogSchema, blogSchema, parseBlogCatalog } from '../../src/data/blogs.schema.mjs';

const catalogText = readFileSync(new URL('../../src/data/blogs.json', import.meta.url), 'utf-8');
const [article] = JSON.parse(catalogText);

test('the curated catalog satisfies its schema and cross-entry integrity rules', () => {
	assert.doesNotThrow(() => parseBlogCatalog(catalogText));
});

test('contains exactly the three approved canonical Tech Community posts', () => {
	assert.deepEqual(
		JSON.parse(catalogText).map(({ id, url }) => ({ id, url })),
		[
			{
				id: '4566381',
				url: 'https://techcommunity.microsoft.com/blog/integrationsonazureblog/%f0%9f%86%95orchestrate-foundry-prompt-and-hosted-agents-with-logic-apps-automation/4566381',
			},
			{
				id: '4562264',
				url: 'https://techcommunity.microsoft.com/blog/integrationsonazureblog/%f0%9f%92%b2announcing-free-grant-and-pricing-for-logic-apps-automation/4562264',
			},
			{
				id: '4524685',
				url: 'https://techcommunity.microsoft.com/blog/integrationsonazureblog/whats-new-in-azure-logic-apps-at-microsoft-build-2026/4524685',
			},
		],
	);
});

test('allows an empty catalog so the index can retain its broader community link', () => {
	assert.deepEqual(parseBlogCatalog('[]'), []);
});

for (const field of ['id', 'title', 'url', 'publishedAt', 'author', 'summary']) {
	test(`rejects a missing required ${field}`, () => {
		const entry = { ...article };
		delete entry[field];
		assert.equal(blogSchema.safeParse(entry).success, false);
	});
}

for (const date of ['2026-02-29', '2026-02-30', '2026-13-01', '2026-10-7', 'not-a-date', '9999-12-31']) {
	test(`rejects invalid publication date ${date}`, () => {
		assert.equal(blogSchema.safeParse({ ...article, publishedAt: date }).success, false);
	});
}

test('accepts a real leap day without timezone-dependent date coercion', () => {
	assert.equal(blogSchema.safeParse({ ...article, publishedAt: '2024-02-29' }).success, true);
});

for (const url of [
	article.url.replace('https:', 'http:'),
	article.url.replace('techcommunity.microsoft.com', 'techcommunity.microsoft.com.evil.example'),
	article.url.replace('techcommunity.microsoft.com', 'example.com'),
	article.url.replace('https://', 'https://reader@'),
	article.url.replace('https://', 'https://@'),
	article.url.replace('techcommunity.microsoft.com', 'techcommunity.microsoft.com:443'),
	article.url.replace('techcommunity.microsoft.com', 'techcommunity.microsoft.com:8443'),
	article.url.replace('https://', '//'),
	`${article.url}\n`,
	`${article.url}?tracking=1`,
	`${article.url}#fragment`,
	`${article.url}/`,
	article.url.replace(`/${article.id}`, '/1'),
	'https://techcommunity.microsoft.com/category/azure/blog/integrationsonazureblog',
	'javascript:alert(1)',
]) {
	test(`rejects unsafe or noncanonical article URL ${url}`, () => {
		assert.equal(blogSchema.safeParse({ ...article, url }).success, false);
	});
}

for (const summary of ['', '   ', '<img src=x onerror=alert(1)>', '[Link](https://example.com)', '**Bold**', '`code`', 'First line\nSecond line']) {
	test(`rejects non-plain summary ${JSON.stringify(summary)}`, () => {
		assert.equal(blogSchema.safeParse({ ...article, summary }).success, false);
	});
}

test('rejects duplicate IDs and URLs before collection indexing can replace them', () => {
	const result = blogCatalogSchema.safeParse([article, article]);
	assert.equal(result.success, false);
	assert(result.error.issues.some(({ message }) => message === 'Duplicate article ID.'));
	assert(result.error.issues.some(({ message }) => message === 'Duplicate article URL.'));
});

test('rejects duplicate URLs with different percent-escape casing', () => {
	const alternate = { ...article, url: article.url.replace(/%[0-9a-f]{2}/g, (value) => value.toUpperCase()) };
	const result = blogCatalogSchema.safeParse([article, alternate]);
	assert.equal(result.success, false);
	assert(result.error.issues.some(({ message }) => message === 'Duplicate article URL.'));
});

for (const href of ['/guides/agent-options/', '//example.com/', 'https://example.com/', '/docs/../support/', '/docs/guides/agent-options']) {
	test(`rejects invalid internal-route syntax ${href}`, () => {
		const relatedDocs = [{ label: 'Related guide', href }];
		assert.equal(blogSchema.safeParse({ ...article, relatedDocs }).success, false);
	});
}

test('allows no related docs or at most two base-prefixed routes with optional anchors', () => {
	const link = { label: 'Pricing', href: '/docs/getting-started/pricing/#free-grants' };
	assert.equal(blogSchema.safeParse({ ...article, relatedDocs: [] }).success, true);
	assert.equal(blogSchema.safeParse({ ...article, relatedDocs: [link, link] }).success, true);
	assert.equal(blogSchema.safeParse({ ...article, relatedDocs: [link, link, link] }).success, false);
});

test('rejects unexpected content fields instead of accepting copied article bodies or images', () => {
	assert.equal(blogSchema.safeParse({ ...article, body: 'Article body' }).success, false);
	assert.equal(blogSchema.safeParse({ ...article, image: 'https://example.com/image.png' }).success, false);
});
