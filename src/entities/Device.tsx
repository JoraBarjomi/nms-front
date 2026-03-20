export type Device = {
  device: string;
  type: string;
  uptime: string;
  load: number;
  status: string;
};

export const DevicesData: Device[] = [
  {
    device: "BS-203",
    type: "eNodeB",
    uptime: "2h14min",
    load: 32,
    status: "up",
  },
  {
    device: "BS-101",
    type: "eNodeB",
    uptime: "32d9h",
    load: 67,
    status: "up",
  },
  {
    device: "BS-113",
    type: "eNodeB",
    uptime: "0d",
    load: 10,
    status: "maint",
  },
  {
    device: "BS-739",
    type: "eNodeB",
    uptime: "173d",
    load: 89,
    status: "deg",
  },
  {
    device: "BS-891",
    type: "eNodeB",
    uptime: "0d",
    load: 0,
    status: "down",
  },
];
