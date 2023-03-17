export const clamp = (min: number, max: number) => (x: number) =>
  Math.max(min, Math.min(x, max));

export const isFiniteNumber = (x: unknown): x is number =>
  Number.isFinite(x as number);

export const modulo = (divisor: number) => (dividend: number) =>
  ((dividend % divisor) + divisor) % divisor;
