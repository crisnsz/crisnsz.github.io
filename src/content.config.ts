import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    // One-line summary shown on cards.
    summary: z.string(),
    // The problem the project solves. The markdown body holds the solution.
    problem: z.string(),
    stack: z.array(z.string()),
    repo: z.url(),
    // Lower numbers are listed first.
    order: z.number(),
    featured: z.boolean(),
    status: z.string().optional(),
  }),
});

export const collections = { projects };
