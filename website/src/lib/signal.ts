// Synthetic ECG and the small processing chain the Signal lab demo runs on it.
// Pure functions only: SignalLab.astro calls them at build time for the static
// picture and again in the browser whenever a control moves, so both agree.
// Nothing here is patient data; every sample comes from the beat model below.

export const FS = 250; // samples per second
export const SECONDS = 10;
export const DEFAULT_SEED = 2024;
export const DEFAULT_NOISE = 30; // percent
export const DEFAULT_FILTER = 3; // step, a 7-sample (28 ms) window

/** Seeded generator (mulberry32): the same seed always draws the same signal. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal draw (Box–Muller). */
function normal(rand: () => number): number {
  return Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
}

/**
 * One PQRST complex as a sum of gaussians, the same five waves as the hero
 * trace (EcgTrace.astro) but timed in seconds from the R peak.
 * Each row: centre (s), width (s), amplitude (mV).
 */
const WAVES: ReadonlyArray<readonly [number, number, number]> = [
  [-0.16, 0.022, 0.13], // P
  [-0.03, 0.008, -0.11], // Q
  [0, 0.011, 1], // R
  [0.032, 0.01, -0.24], // S
  [0.26, 0.04, 0.26], // T
];

export function beat(t: number): number {
  let v = 0;
  for (const [c, w, a] of WAVES) v += a * Math.exp(-((t - c) ** 2) / (2 * w * w));
  return v;
}

/** The parts of a recording, kept apart so the noise slider only rescales them. */
export interface Recording {
  fs: number;
  clean: Float64Array; // the beats alone
  wander: Float64Array; // breathing and electrode drift, unit scale
  hum: Float64Array; // 50 Hz mains, unit amplitude
  noise: Float64Array; // white noise with two muscle bursts, unit scale
  beats: number[]; // true R-peak times (s)
}

export function record(seed = DEFAULT_SEED, seconds = SECONDS, fs = FS): Recording {
  const rand = rng(seed);
  const n = Math.round(seconds * fs);
  const bpm = 64 + rand() * 12;
  const rsa = rand() * 2 * Math.PI;

  // R-R intervals: mean rate, a breathing rhythm (0.25 Hz) and a little jitter.
  const beats: number[] = [];
  const amps: number[] = [];
  for (let t = 0.3 + rand() * 0.3; t < seconds - 0.35; ) {
    beats.push(t);
    amps.push(1 + 0.04 * normal(rand));
    t += 60 / bpm + 0.035 * Math.sin(2 * Math.PI * 0.25 * t + rsa) + 0.018 * normal(rand);
  }

  const [p1, p2, p3] = [rand(), rand(), rand()].map((u) => u * 2 * Math.PI);
  const bursts = [rand() * seconds, rand() * seconds];
  const clean = new Float64Array(n);
  const wander = new Float64Array(n);
  const hum = new Float64Array(n);
  const noise = new Float64Array(n);

  for (let i = 0; i < n; i++) {
    const t = i / fs;
    let v = 0;
    for (let k = 0; k < beats.length; k++) {
      const d = t - beats[k];
      if (d > -0.4 && d < 0.5) v += amps[k] * beat(d);
    }
    clean[i] = v;
    wander[i] = 0.65 * Math.sin(2 * Math.PI * 0.21 * t + p1) + 0.45 * Math.sin(2 * Math.PI * 0.06 * t + p2);
    hum[i] = Math.sin(2 * Math.PI * 50 * t + p3);
    const burst = bursts.reduce((s, c) => s + 0.8 * Math.exp(-((t - c) ** 2) / (2 * 0.2 ** 2)), 0);
    noise[i] = normal(rand) * (1 + burst);
  }
  return { fs, clean, wander, hum, noise, beats };
}

/** The raw trace at a noise level between 0 and 1. */
export function mix(rec: Recording, level: number): Float64Array {
  const w = 0.1 + 0.6 * level;
  const h = 0.02 + 0.2 * level;
  const s = 0.015 + 0.4 * level;
  return rec.clean.map((v, i) => v + w * rec.wander[i] + h * rec.hum[i] + s * rec.noise[i]);
}

/** Centred moving average; the window shrinks at the edges. */
export function movingAverage(x: Float64Array, width: number): Float64Array {
  const half = Math.floor(width / 2);
  const sum = new Float64Array(x.length + 1);
  for (let i = 0; i < x.length; i++) sum[i + 1] = sum[i] + x[i];
  return x.map((_, i) => {
    const a = Math.max(0, i - half);
    const b = Math.min(x.length, i + half + 1);
    return (sum[b] - sum[a]) / (b - a);
  });
}

/** Filter strength runs from 0 (off) to this many steps. */
export const FILTER_STEPS = 5;

/** Smoothing window in samples for a filter step: 3, 5, 7, 9 or 11. */
export const smoothingWidth = (step: number): number => 2 * Math.round(step) + 1;

/**
 * Step 0 leaves the trace as it is. Above 0 the baseline (a 0.6 s moving
 * average) is subtracted and the rest smoothed with a short moving average
 * whose window grows with the step.
 */
export function filter(raw: Float64Array, fs: number, step: number): Float64Array {
  if (step <= 0) return raw.slice();
  const base = movingAverage(raw, Math.round(0.6 * fs) | 1);
  return movingAverage(raw.map((v, i) => v - base[i]), smoothingWidth(step));
}

/**
 * R peaks: samples above half the trace's 99th percentile that are also the
 * highest point within 300 ms either side. Times are refined between samples
 * by fitting a parabola through the peak and its neighbours.
 */
export function detect(x: Float64Array, fs: number): number[] {
  const sorted = Float64Array.from(x).sort();
  const threshold = 0.5 * sorted[Math.floor(0.99 * (sorted.length - 1))];
  const reach = Math.round(0.3 * fs);
  const found: number[] = [];
  for (let i = 1; i < x.length - 1; i++) {
    if (x[i] < threshold) continue;
    let top = true;
    for (let j = Math.max(0, i - reach); j <= Math.min(x.length - 1, i + reach) && top; j++) {
      if (x[j] > x[i] || (x[j] === x[i] && j < i)) top = false;
    }
    if (!top) continue;
    const den = x[i - 1] - 2 * x[i] + x[i + 1];
    const shift = den === 0 ? 0 : (0.5 * (x[i - 1] - x[i + 1])) / den;
    found.push((i + Math.max(-0.5, Math.min(0.5, shift))) / fs);
  }
  return found;
}

export interface Score {
  clean: number; // detections within 60 ms of a true beat
  missed: number; // true beats with no detection
  false: number; // detections with no true beat
}

/** Pairs detections with true beats one to one, at most 60 ms apart. */
export function match(found: number[], truth: number[], tolerance = 0.06): { hit: boolean[]; caught: boolean[] } {
  const hit = found.map(() => false);
  const caught = truth.map(() => false);
  let i = 0;
  let j = 0;
  while (i < found.length && j < truth.length) {
    if (Math.abs(found[i] - truth[j]) <= tolerance) hit[i++] = caught[j++] = true;
    else if (found[i] < truth[j]) i++;
    else j++;
  }
  return { hit, caught };
}

export interface Rhythm {
  bpm: number; // 60 / mean R-R interval
  rmssd: number; // root mean square of successive R-R differences (ms)
}

export function rhythm(times: number[]): Rhythm | null {
  if (times.length < 3) return null;
  const rr = times.slice(1).map((t, i) => t - times[i]);
  const dd = rr.slice(1).map((r, i) => r - rr[i]);
  const mean = rr.reduce((s, r) => s + r, 0) / rr.length;
  const rmssd = Math.sqrt(dd.reduce((s, d) => s + d * d, 0) / dd.length) * 1000;
  return { bpm: 60 / mean, rmssd };
}

/** Vertical range of the plot (mV); values outside are clipped. */
export const RANGE: readonly [number, number] = [-1.5, 2];

/**
 * Percentage position of a point on the plot, for markers laid over the SVG;
 * kept 3 % inside the edges so a marker on a clipped spike stays visible.
 */
export function plotPoint(time: number, value: number, seconds = SECONDS): { left: number; top: number } {
  const [lo, hi] = RANGE;
  const top = (1 - (value - lo) / (hi - lo)) * 100;
  return { left: (time / seconds) * 100, top: Math.min(97, Math.max(3, top)) };
}

export interface Marker {
  kind: 'clean' | 'false' | 'missed';
  left: number; // percent of the plot width
  top: number; // percent of the plot height
}

export interface Analysis {
  raw: Float64Array;
  filtered: Float64Array;
  found: number[];
  score: Score;
  markers: Marker[];
  measured: Rhythm | null;
  actual: Rhythm | null;
}

/** The whole chain for one setting: noise from 0 to 1, filter step 0 to 5. */
export function analyse(rec: Recording, noise: number, step: number): Analysis {
  const raw = mix(rec, noise);
  const filtered = filter(raw, rec.fs, step);
  const found = detect(filtered, rec.fs);
  const { hit, caught } = match(found, rec.beats);
  const seconds = raw.length / rec.fs;
  const at = (t: number) => filtered[Math.min(filtered.length - 1, Math.round(t * rec.fs))];
  const markers: Marker[] = [
    ...rec.beats.filter((_, j) => !caught[j]).map((t) => ({ kind: 'missed' as const, ...plotPoint(t, at(t), seconds) })),
    ...found.map((t, i) => ({ kind: hit[i] ? ('clean' as const) : ('false' as const), ...plotPoint(t, at(t), seconds) })),
  ];
  const clean = hit.filter(Boolean).length;
  return {
    raw,
    filtered,
    found,
    score: { clean, missed: rec.beats.length - clean, false: found.length - clean },
    markers,
    measured: rhythm(found),
    actual: rhythm(rec.beats),
  };
}

/** The numbers the demo prints, formatted once for the build and the browser. */
export interface Readout {
  bpm: string;
  bpmTrue: string;
  rmssd: string;
  rmssdTrue: string;
  found: number;
  generated: number;
  share: number; // clean detections as a percentage of all outcomes
}

export function readout(a: Analysis): Readout {
  const { clean, missed, false: wrong } = a.score;
  const fmt = (v: number | undefined) => (v === undefined ? '–' : String(Math.round(v)));
  const outcomes = clean + missed + wrong;
  return {
    bpm: fmt(a.measured?.bpm),
    bpmTrue: fmt(a.actual?.bpm),
    rmssd: fmt(a.measured?.rmssd),
    rmssdTrue: fmt(a.actual?.rmssd),
    found: a.found.length,
    generated: clean + missed,
    share: outcomes ? Math.round((clean / outcomes) * 100) : 0,
  };
}

/** Readable name of a filter step for the slider's output. */
export const filterLabel = (step: number, fs = FS): string =>
  step <= 0 ? 'Off' : `${Math.round((smoothingWidth(step) * 1000) / fs)} ms window`;

/**
 * Dash pattern of each donut segment on a circle with pathLength 100,
 * starting at 12 o'clock, with a small gap between segments.
 */
export function donut(s: Score): { kind: keyof Score; dash: string; offset: string }[] {
  const kinds: (keyof Score)[] = ['clean', 'missed', 'false'];
  const total = kinds.reduce((sum, k) => sum + s[k], 0) || 1;
  const shown = kinds.filter((k) => s[k] > 0).length;
  const gap = shown > 1 ? 1.2 : 0;
  let start = 0;
  return kinds.map((k) => {
    const share = (s[k] / total) * 100;
    const len = share > 0 ? Math.max(0.5, share - gap) : 0;
    const seg = { kind: k, dash: `${len.toFixed(2)} ${(100 - len).toFixed(2)}`, offset: (25 - start).toFixed(2) };
    start += share;
    return seg;
  });
}

/**
 * SVG path of a trace in a width x height box, decimated to the lowest and
 * highest sample of each bucket so the R spikes survive at any zoom.
 */
export function tracePath(x: Float64Array, width = 1000, height = 100, bucket = 5): string {
  const [lo, hi] = RANGE;
  const y = (v: number) => (height - ((Math.min(hi, Math.max(lo, v)) - lo) / (hi - lo)) * height).toFixed(1);
  const step = width / x.length;
  const parts: string[] = [];
  for (let s = 0; s < x.length; s += bucket) {
    let a = s;
    let b = s;
    for (let i = s; i < Math.min(x.length, s + bucket); i++) {
      if (x[i] < x[a]) a = i;
      if (x[i] > x[b]) b = i;
    }
    for (const i of a <= b ? [a, b] : [b, a]) parts.push(`${(i * step).toFixed(1)} ${y(x[i])}`);
  }
  return `M${parts.join('L')}`;
}
