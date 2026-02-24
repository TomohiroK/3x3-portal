/**
 * Safe URL search param parsing utilities.
 * Always validate at the boundary (API route / page) before using in queries.
 */

/** Parse a search string, clamping length to prevent abuse */
export function parseSearchParam(value: string | null, maxLength = 100): string {
  if (!value) return '';
  return value.trim().slice(0, maxLength);
}

/** Parse a positive integer param, returning a default if invalid */
export function parseIntParam(value: string | null, defaultValue: number): number {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultValue;
}

/** Parse a page number (min 1) */
export function parsePageParam(value: string | null): number {
  return Math.max(1, parseIntParam(value, 1));
}

/** Parse a page size, clamped between 1 and maxAllowed */
export function parsePageSizeParam(
  value: string | null,
  defaultSize = 20,
  maxAllowed = 100
): number {
  const parsed = parseIntParam(value, defaultSize);
  return Math.min(Math.max(1, parsed), maxAllowed);
}

/** Parse an optional positive integer (e.g. teamId). Returns null if absent/invalid. */
export function parseOptionalIntParam(value: string | null): number | null {
  if (!value) return null;
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}
