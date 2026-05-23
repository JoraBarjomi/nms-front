import { type AllSeverities } from "../../shared/constants/allSeverity";

export type Alarms = {
  id: number;
  ne_id: string;
  severity: AllSeverities;
  message: string;
  created_at: string;
};
