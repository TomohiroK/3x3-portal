/**
 * "NEW" badge — shown when an item was updated within the last 3 days.
 */
export function NewBadge() {
  return (
    <span
      className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase bg-brand-accent text-white leading-none"
      aria-label="新着"
    >
      NEW
    </span>
  );
}
