import { type AllStatuses } from "../shared/constants/allStatuses";
import { type AllDevices } from "../shared/constants/allDevices";

export type Device = {
  device: string;
  type: AllDevices;
  uptime: string;
  load: number;
  status: AllStatuses;
  ip?: string;
};

export const DevicesData: Device[] = [
  {
    device: "BS-203",
    type: "eNodeB",
    uptime: "2h14min",
    load: 32,
    status: "up",
    ip: "192.168.0.3",
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
    ip: "10.34.3.17",
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
    ip: "192.168.0.43",
  },
];
