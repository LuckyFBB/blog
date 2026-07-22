import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({
    base: './src/content/posts',
    pattern: '**/*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z
    .object({
      title: z.string(),
      group: z.any().optional(),
      order: z.number().optional(),
      hero: z.any().optional(),
      features: z.any().optional(),
    })
    .passthrough(),
});

export const collections = { posts };
