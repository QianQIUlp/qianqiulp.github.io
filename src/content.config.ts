import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    description: z.string(),
    ogImage: image().optional(),
    ogImageAlt: z.string().optional(),
    toc: z.boolean().optional(),
    license: z.string().optional(),
  }),
});

export const collections = { posts };
