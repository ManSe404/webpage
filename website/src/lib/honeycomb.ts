// Honeycomb layout shared by the dashboard and the project honeycombs, on the
// server (first render) and in the browser (after a filter hides cells).
// Each cell spans two half-columns; every second row shifts by one half-column
// and overlaps the row above by a quarter of a cell's height.

/** Grid position of the i-th visible cell with `perRow` cells per row. */
export function place(i: number, perRow: number): { row: number; col: number } {
  const row = Math.floor(i / perRow) + 1;
  return { row, col: (i % perRow) * 2 + 1 + (row % 2 === 0 ? 1 : 0) };
}

/** grid-template-rows for n cells: every row but the last takes 0.75 of a cell. */
export function tracks(n: number, perRow: number): string {
  const rows = Math.max(1, Math.ceil(n / perRow));
  return [...Array(rows - 1).fill('calc(var(--h) * 0.75)'), 'var(--h)'].join(' ');
}

/** Half-cell columns: two per cell in the widest row, one more when a second row shifts. */
export function cols(n: number, perRow: number): number {
  return Math.min(perRow, Math.max(n, 1)) * 2 + (n > perRow ? 1 : 0);
}
