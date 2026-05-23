export const ALL_SEVERITIES = {
  CRITICAL: "critical",
  MAJOR: "major",
  WARNING: "warning",
} as const;
export type AllSeverities =
  (typeof ALL_SEVERITIES)[keyof typeof ALL_SEVERITIES];
