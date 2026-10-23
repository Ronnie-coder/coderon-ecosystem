// src/lib/random.ts
// Tiny random-number helpers for the demo dashboards (replaces @faker-js/faker).

/** Whole number between min and max, both included. */
export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Decimal number between min and max, optionally rounded to `fractionDigits`. */
export function randFloat(min: number, max: number, fractionDigits?: number): number {
  const n = Math.random() * (max - min) + min;
  return fractionDigits === undefined ? n : Number(n.toFixed(fractionDigits));
}
