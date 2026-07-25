export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Deterministic-ish pseudo random generator seeded by index, so
 *  particle layouts don't shift between server and client render. */
export function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}
