// Reduces the site's collections to what the home page dashboard shows.
// Everything here is derived at build time from the same data the other
// pages read, so the dashboard cannot drift from the projects, career,
// education and publication files.
import type { CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;
type Role = CollectionEntry<'experience'>;
type Publication = CollectionEntry<'publications'>;

export interface Degree {
  degree: string;
  institution: string;
  period?: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2025-04" -> "Apr 2025"; anything else is returned as given. */
export function formatMonth(value: string | null): string {
  if (!value) return 'Present';
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  return match ? `${MONTHS[Number(match[2]) - 1]} ${match[1]}` : value;
}

export const isOwnWork = (org?: string) => org === 'Personal' || org === 'Open source';

/** Who the work was for: own projects, the research institute, or a client or employer. */
export const workType = (org?: string): 'personal' | 'research' | 'client' =>
  isOwnWork(org) ? 'personal' : org === 'BioIRC' ? 'research' : 'client';

/** The largest h where h works each have at least h citations. */
export function hIndex(citations: number[]): number {
  const sorted = [...citations].sort((a, b) => b - a);
  let h = 0;
  while (h < sorted.length && sorted[h] >= h + 1) h++;
  return h;
}

/** How many projects use each tool, most used first. */
export function toolUsage(projects: Project[]): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of projects) {
    for (const tool of new Set(p.data.stack)) counts.set(tool, (counts.get(tool) ?? 0) + 1);
  }
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export type Field = 'ai' | 'data' | 'other';
const AI_TOPICS = ['Generative AI', 'Agentic AI', 'Conversational AI', 'Computer Vision'];
const DATA_TOPICS = ['Data Engineering', 'Machine Learning'];
export const fieldOf = (category: string): Field =>
  AI_TOPICS.includes(category) ? 'ai' : DATA_TOPICS.includes(category) ? 'data' : 'other';

/**
 * Tools as bubbles: a size from how many projects use the tool (no number is
 * shown) and the field it is used in most, for its colour. The most used first.
 */
export function toolBubbles(projects: Project[], limit = 30): { name: string; size: number; field: Field }[] {
  const fields = new Map<string, Record<Field, number>>();
  for (const p of projects) {
    const f = fieldOf(p.data.category);
    for (const tool of new Set(p.data.stack)) {
      const tally = fields.get(tool) ?? { ai: 0, data: 0, other: 0 };
      tally[f]++;
      fields.set(tool, tally);
    }
  }
  const used = toolUsage(projects).slice(0, limit);
  const top = used[0]?.count ?? 1;
  return used.map(({ name, count }) => {
    const tally = fields.get(name)!;
    const field = (Object.keys(tally) as Field[]).sort((a, b) => tally[b] - tally[a])[0];
    // Area follows use: the diameter grows with the square root of the count.
    return { name, size: Math.round(64 + 76 * Math.sqrt((count - 1) / Math.max(top - 1, 1))), field };
  });
}

/** The one line that says what a project achieved: its Result metric, else its first impact line. */
export function projectResult(p: Project): string | undefined {
  return p.data.metrics.find((m) => m.label === 'Result')?.value ?? p.data.impact[0];
}

export function attribution(p: Project): string {
  return [p.data.org, p.data.client && `with ${p.data.client}`].filter(Boolean).join(' · ');
}

export interface NowItem {
  kind: 'Leading' | 'Building' | 'Studying';
  title: string;
  detail: string;
}

/**
 * What is in progress today: current roles, studies not finished, and the
 * projects still being built — those whose period runs to the present and
 * that state a Stage, so finished work that is merely ongoing stays out.
 */
export function inProgress(roles: Role[], projects: Project[], degrees: Degree[]): NowItem[] {
  const leading = roles
    .filter((r) => r.data.end === null)
    .map((r) => ({ kind: 'Leading' as const, title: r.data.role, detail: r.data.company }));
  const stage = (p: Project) => p.data.metrics.find((m) => m.label === 'Stage')?.value;
  const building = projects
    .filter((p) => /present/i.test(p.data.period ?? '') && stage(p))
    .sort((a, b) => a.data.order - b.data.order)
    .map((p) => ({ kind: 'Building' as const, title: p.data.title, detail: stage(p) as string }));
  const studying = degrees
    .filter((d) => /present/i.test(d.period ?? ''))
    .map((d) => ({ kind: 'Studying' as const, title: d.degree, detail: d.institution }));
  return [...leading, ...studying, ...building];
}

/** Roles newest first. */
export function rolesNewestFirst(roles: Role[]): Role[] {
  return [...roles].sort((a, b) => b.data.start.localeCompare(a.data.start));
}

/** Partners of the consultancy, from the projects delivered through it. */
export function consultancyPartners(projects: Project[], consultancy = '404 Solutions') {
  const own = projects.filter((p) => p.data.org === consultancy);
  const partners = new Map<string, number>();
  for (const p of own) if (p.data.client) partners.set(p.data.client, (partners.get(p.data.client) ?? 0) + 1);
  return {
    projects: own.length,
    partners: [...partners].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
  };
}

export function topCited(publications: Publication[], n = 3): Publication[] {
  return [...publications].sort((a, b) => b.data.citations - a.data.citations || b.data.year - a.data.year).slice(0, n);
}
