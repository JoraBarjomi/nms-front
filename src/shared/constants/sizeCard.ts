export const SIZE = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;
export type Size = (typeof SIZE)[keyof typeof SIZE];
