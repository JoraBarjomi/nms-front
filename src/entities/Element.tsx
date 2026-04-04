import type { AllStatuses } from "../shared/constants/allStatuses";

export interface NetworkElement {
  id: string;
  name: string;
  address: string;
  vendor: string;
  status: AllStatuses;
  capabilities: string[];
  created_at: string;
  updated_at: string;
}


