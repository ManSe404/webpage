/**
 * A calm synthetic heart for the home page's vitals monitor: R-peak times
 * around 72 beats a minute, with breathing-paced variation and a little
 * noise, drawn with the same beat shape as the lab (lib/signal.ts). The
 * monitor's numbers are computed from these beats, not typed in. Pure
 * functions, shared by the server (the first picture) and the browser.
 */
import { beat, rhythm, rng } from './signal';

export const VITALS_SEED = 7;
/** Seconds of signal across the monitor, and drawn columns per second. */
export const WINDOW_SECONDS = 4;
export const COLUMNS_PER_SECOND = 60;
export const COLUMNS = WINDOW_SECONDS * COLUMNS_PER_SECOND;
/** Where the monitor starts in the signal: late enough that the first numbers average eight beats. */
export const START_SECONDS = 12;

/** The window the monitor shows first: column c holds the signal at START - WINDOW + c / columns-per-second. */
export function firstWindow(peaks: number[]): number[] {
  return Array.from({ length: COLUMNS }, (_, c) => toY(valueAt(peaks, START_SECONDS - WINDOW_SECONDS + c / COLUMNS_PER_SECOND)));
}

/** R-peak times in seconds: about 0.83 s apart (72 bpm), swaying with the breath. */
export function rPeaks(seed = VITALS_SEED, count = 2000): number[] {
  const rand = rng(seed);
  const times = [0.45];
  for (let i = 1; i < count; i++) {
    const rr = 0.83 + 0.035 * Math.sin((2 * Math.PI * i) / 4.5) + (rand() - 0.5) * 0.04;
    times.push(times[i - 1] + rr);
  }
  return times;
}

/** Index of the first peak at or after time t (binary search). */
export function firstPeakFrom(peaks: number[], t: number): number {
  let lo = 0;
  let hi = peaks.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (peaks[mid] < t) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/** Signal value at time t: the beats whose waves reach t (P starts 0.2 s before R, T ends 0.4 s after). */
export function valueAt(peaks: number[], t: number): number {
  let v = 0;
  for (let i = firstPeakFrom(peaks, t - 0.45); i < peaks.length && peaks[i] < t + 0.25; i++) v += beat(t - peaks[i]);
  return v;
}

/** Heart rate and HRV (RMSSD) from the last `n` beats before time t. */
export function vitalsAt(peaks: number[], t: number, n = 8): { bpm: number; rmssd: number } | null {
  const end = firstPeakFrom(peaks, t);
  return rhythm(peaks.slice(Math.max(0, end - n), end));
}

/** Vertical position (0 top, 1 bottom) of a value on the monitor. */
export const toY = (v: number): number => 0.72 - v * 0.6;

/** SVG path of the columns, leaving out the ones in `gap` (the sweep's eraser). */
export function tracePath(ys: ArrayLike<number>, height: number, gap?: { from: number; to: number }): string {
  let d = '';
  let pen = false;
  for (let c = 0; c < ys.length; c++) {
    if (gap && c >= gap.from && c <= gap.to) { pen = false; continue; }
    d += `${pen ? 'L' : 'M'}${c} ${(ys[c] * height).toFixed(1)}`;
    pen = true;
  }
  return d;
}
