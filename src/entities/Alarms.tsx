import { type AllStatuses } from "../shared/constants/allStatuses";

export type Alarms = {
  status: AllStatuses;
  device: string;
  probable_cause: string;
  spec_problem: string;
};

export const AlarmsData: Alarms[] = [
  {
    status: "critical",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "major",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "warning",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "critical",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "critical",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "major",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "warning",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "critical",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
];
