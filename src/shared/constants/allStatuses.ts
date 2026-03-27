export const ALL_STATUSES = {
  UP: "up",
  DOWN: "down",
  MAINT: "maint",
  DEG: "deg",
  CRITICAL: "critical",
  MAJOR: "major",
  WARNING: "warning",
  CLOSED: "closed",
} as const;
export type AllStatuses = (typeof ALL_STATUSES)[keyof typeof ALL_STATUSES];
