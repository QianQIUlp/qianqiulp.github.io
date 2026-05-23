import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://qianqiulp.github.io',
  outDir: 'dist',
  integrations: [sitemap()],
});
