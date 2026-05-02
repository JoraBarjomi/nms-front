import { type AllStatuses } from "../shared/constants/allStatuses";

export type Alarms = {
  id: number;
  status: AllStatuses;
  device: string;
  probable_cause: string;
  spec_problem: string;
};

export const AlarmsData: Alarms[] = [
  {
    id: 1,
    status: "critical",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    id: 2,
    status: "major",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    id: 3,
    status: "warning",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    id: 4,
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    id: 5,
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    id: 6,
    status: "critical",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    id: 7,
    status: "critical",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    id: 8,
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    id: 9,
    status: "major",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    id: 10,
    status: "warning",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    id: 11,
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    id: 12,
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    id: 13,
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    id: 14,
    status: "critical",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    id: 15,
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
];
