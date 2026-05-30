// Remark plugin: prefix all root-relative markdown links with the site's base.
//
// Astro/Starlight rewrites links it owns (sidebar, pagination, etc.) to add
// the `base` prefix, but it does NOT rewrite plain markdown links of the form
// `[text](/foo)`. Without this plugin, content authors would have to write
// `[text](/docs/foo)` everywhere, which is ugly and fragile if the base ever
// changes. This plugin lets authors keep writing `/foo` and we prepend the
// base at build time.

import { visit } from 'unist-util-visit';

/**
 * @param {{ base: string }} options
 */
export function remarkBasePrefix({ base }) {
  if (!base || base === '/') {
    return () => {};
  }
  const normalizedBase = base.replace(/\/$/, '');
  return () => (tree) => {
    visit(tree, 'link', (node) => {
      const url = node.url;
      if (typeof url !== 'string') return;
      // Skip protocol-relative (`//host/path`), absolute URLs, and fragments.
      if (!url.startsWith('/') || url.startsWith('//')) return;
      // Skip URLs that already start with the base (idempotent).
      if (url === normalizedBase || url.startsWith(normalizedBase + '/')) return;
      node.url = normalizedBase + url;
    });
  };
}
