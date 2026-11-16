/**
 * The lab's demos, in tab order. The menu's Lab dropdown and the lab's tabs
 * both read this list, so a demo is added or renamed in one place. `hash` is
 * the address on /lab/, `panel` the lab panel that holds it and `diagram` the
 * diagram id in data/architectures.json, for the two architecture demos.
 */
export const LAB_DEMOS = [
  { hash: 'signal', label: 'Signal processing', panel: 'signal', diagram: undefined },
  { hash: 'data-platform', label: 'Data platform', panel: 'architecture', diagram: 'data' },
  { hash: 'ai-system', label: 'AI system', panel: 'architecture', diagram: 'ai' },
] as const;
