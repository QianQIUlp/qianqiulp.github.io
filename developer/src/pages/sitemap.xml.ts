const site = import.meta.env.SITE;

if (!site) {
  throw new Error('Missing site URL in Astro configuration.');
}

export function GET() {
  const urls = ['/', '/zh/']
    .map((path) => `  <url>\n    <loc>${new URL(path, site).href}</loc>\n  </url>`)
    .join('\n');
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
