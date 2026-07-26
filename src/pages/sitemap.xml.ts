import { getCollection } from 'astro:content';

const SITE_URL = import.meta.env.SITE;
if (!SITE_URL) {
  throw new Error('Missing site URL. Set `site` in astro.config.mjs so sitemap URLs are absolute.');
}

function urlEntry(path: string, lastmod?: Date) {
  const loc = new URL(path, SITE_URL).href;
  const lastmodTag = lastmod ? `\n    <lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : '';

  return `  <url>\n    <loc>${loc}</loc>${lastmodTag}\n  </url>`;
}

export async function GET() {
  const posts = await getCollection('posts');
  const staticPages = ['/', '/blog/', '/projects/', '/en/', '/en/blog/', '/en/projects/'].map((path) => urlEntry(path));
  const postPages = posts
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((post) => urlEntry(`/blog/posts/${post.id}/`, post.data.date));
  const englishPostPages = posts
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((post) => urlEntry(`/en/blog/posts/${post.id}/`, post.data.date));

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticPages,
    ...postPages,
    ...englishPostPages,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
