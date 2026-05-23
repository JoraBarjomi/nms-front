import { type Alarms } from "../Alarms";
import { getToken, logout } from "../../../shared/utils/authHelpers";
import { loggedFetch } from "../../../shared/utils/logHelper";

interface FetchParams {
  ne_id?: string;
  limit?: number;
}

export const fetchAlarms = async (params?: FetchParams): Promise<Alarms[]> => {
  const token = getToken();

  const query = new URLSearchParams();
  if (params?.ne_id) query.append("ne_id", params.ne_id);
  query.append("limit", (params?.limit || 50).toString());

  const response = await loggedFetch(
    `/api/v1/fault/events?${query.toString()}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (response.status === 401) {
    logout();
    throw new Error("Session expired! Please login.");
  }

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => ({}))) as {
      error?: string;
    };
    const message = errorBody.error || `HTTP error! status: ${response.status}`;
    throw new Error(`${message} (${response.status})`);
  }

  return response.json();
};

export async function createTestAlarm(formData: {
  ne_id: string;
  severity: string;
  message: string;
}) {
  const token = getToken();

  const response = await loggedFetch("/api/v1/fault/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (response.status === 401) {
    logout();
    throw new Error("Session expired! Please login.");
  }
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
