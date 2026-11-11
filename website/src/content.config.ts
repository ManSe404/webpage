import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { parseCsv } from './lib/csv';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    summary: z.string(),
    // Featured projects get a full case-study treatment on the home page.
    featured: z.boolean().default(false),
    order: z.number().default(99),
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
    // Set when a date is a placeholder awaiting confirmation. Timeline.astro
    // warns on every build while any entry still has this set.
    dateUnconfirmed: z.boolean().default(false),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    // The role the collaborations were delivered under. Timeline.astro lists
    // the partners from collaborations.json under this entry.
    collaborations: z.boolean().default(false),
  }),
});

const collaborations = defineCollection({
  loader: file('src/data/collaborations.json'),
  schema: z.object({
    name: z.string(),
    // Omitted when the engagement was direct rather than routed through an
    // employer — nothing is asserted about the relationship by default.
    via: z.string().optional(),
    location: z.string().optional(),
    kind: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    // Flags copy that still needs Stefan's sign-off before going live.
    needsReview: z.boolean().default(false),
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

export const collections = { projects, experience, collaborations, publications };
