export const ALL_DEVICES = {
  ENODEB: "eNodeB",
  ROUTER: "router",
  SWITCH: "switch",
} as const;
export type AllDevices = (typeof ALL_DEVICES)[keyof typeof ALL_DEVICES];
