import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { parseCsv } from './lib/csv';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    summary: z.string(),
    // Position in the dashboard's Projects panel (the "Projects" cell), 1 first;
    // projects without it are not in that panel. Set by hand.
    featured: z.number().int().positive().optional(),
    order: z.number().default(99),
    // Position in the home page's Chosen work honeycomb (1 = first cell); projects
    // without it are not on the home page. Set by hand, strongest first.
    home: z.number().int().positive().optional(),
    period: z.string().optional(),
    // org = the employer the work was delivered under.
    // client = the partner or end customer, where it can be named publicly.
    org: z.string().optional(),
    client: z.string().optional(),
    impact: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    metrics: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .default([]),
    link: z.string().url().optional(),
  }),
});

const experience = defineCollection({
  loader: file('src/data/experience.json'),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    start: z.string(),
    end: z.string().nullable(),
    current: z.boolean().default(false),
    // Set when a date is a placeholder awaiting confirmation. hive/HivePanels.astro
    // warns on every build while any entry still has this set.
    dateUnconfirmed: z.boolean().default(false),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
  }),
});

const publications = defineCollection({
  loader: file('src/data/publications.csv', {
    parser: (text) =>
      parseCsv(text).map((row) => ({
        ...row,
        // A blank cell parses as "", which is not a valid URL. Not every work
        // has a DOI — conference papers often don't — so drop the key instead.
        url: row.url || undefined,
        // Year and venue are part of the id because two of these titles are
        // identical for their first 60-odd characters; slugging the title
        // alone silently collapsed them into one entry.
        id: slugify(`${row.year}-${row.venue}-${row.title}`),
      })),
  }),
  schema: z.object({
    year: z.coerce.number(),
    title: z.string(),
    venue: z.string(),
    type: z.string(),
    topic: z.string(),
    role: z.string().default('Co-author'),
    citations: z.coerce.number().default(0),
    url: z.string().url().optional(),
  }),
});

function slugify(value: string): string {
  // Deliberately not truncated — ids only need to be unique and stable, and
  // trimming them to a fixed length is what caused near-identical titles to
  // collide in the first place.
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const collections = { projects, experience, publications };
