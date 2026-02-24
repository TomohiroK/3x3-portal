/**
 * Single utility for all date/time formatting.
 * Centralizing here makes i18n adoption straightforward later.
 */

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const DATE_SHORT_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

const DATETIME_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

/** "June 1, 2025" */
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('ja-JP', DATE_FORMAT);
}

/** "Jun 1, 2025" */
export function formatDateShort(isoString: string): string {
  return new Date(isoString).toLocaleDateString('ja-JP', DATE_SHORT_FORMAT);
}

/** "Jun 1, 2025, 14:00" */
export function formatDateTime(isoString: string): string {
  return new Date(isoString).toLocaleString('ja-JP', DATETIME_FORMAT);
}

/** Returns true if the ISO date is in the future */
export function isUpcoming(isoString: string): boolean {
  return new Date(isoString) >= new Date();
}
