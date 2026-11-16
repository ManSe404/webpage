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

/** "2025-04" to "2026-11" (or to `now` while current) -> "1 yr 8 mos"; whole months, start month included. */
export function tenure(start: string, end: string | null, now = new Date()): string {
  const [sy, sm] = start.split('-').map(Number);
  const [ey, em] = end ? end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1];
  const months = Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`].filter(Boolean).join(' ');
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

export function topCited(publications: Publication[], n = 3): Publication[] {
  return [...publications].sort((a, b) => b.data.citations - a.data.citations || b.data.year - a.data.year).slice(0, n);
}
