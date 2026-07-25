export type TimelineEntry = {
  date: string;
  caption: string;
};

/**
 * Edit freely — add, remove, or reorder entries. They render in the
 * order listed here, top to bottom.
 */
export const timelineEntries: TimelineEntry[] = [
  { date: "25 November 2025", caption: "The day I knew this was different." },
  { date: "11 January 2026", caption: "The day we first talked." },
  { date: "From 11 January till 29 June", caption: "So many firsts, so much laughter, so much talk, so many mistakessss." },
  { date: "30 June 2026", caption: "The last time we really talked." },
];
