import { type NetworkElement } from "../Element";
import { getToken, logout } from "../../../shared/utils/authHelpers";
import { loggedFetch } from "../../../shared/utils/logHelper";

export const fetchNetworkElements = async (): Promise<NetworkElement[]> => {
  const token = getToken();
  const response = await loggedFetch(`/api/v1/ne`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("TOKEN:" + token);
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

export const fetchDetailedNetworkElementById = async (
  id: string,
): Promise<unknown> => {
  const token = getToken();
  const response = await loggedFetch(`/api/v1/ne/${id}/inventory/latest`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

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

export const deleteNetworkElements = async (id: string): Promise<void> => {
  const token = getToken();
  const response = await loggedFetch(`/api/v1/ne/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

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
};

export const syncNetworkElements = async (id: string): Promise<unknown> => {
  const token = getToken();
  const response = await loggedFetch(`/api/v1/ne/${id}/inventory/sync`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

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

export async function createNetworkElement(formData: {
  name: string;
  ipAddress: string;
  vendor: string;
  capabilities: string;
}) {
  const token = getToken();
  const payload = {
    name: formData.name,
    address: formData.ipAddress,
    vendor: formData.vendor,
    capabilities: formData.capabilities
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };

  const response = await loggedFetch("/api/v1/ne", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
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

export const fetchCMNetworkElement = async () => {
  const token = getToken();
  const response = await loggedFetch(`/api/v1/cm/requests`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

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

export async function changeNetworkElement(formData: {
  ne_id: string;
  parameter: string;
  value: string;
}) {
  const payload = {
    ne_id: formData.ne_id,
    parameter: formData.parameter,
    value: formData.value,
  };

  const token = getToken();

  const response = await loggedFetch("/api/v1/cm/requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (response.status === 401) {
    logout();
    throw new Error("Session expired! Please login.");
  }

  if (!response.ok) {
    try {
      const errorData = await response.json();
      if (errorData.error) {
        throw new Error(errorData.error);
      }
    } catch (e) {
      if (e instanceof Error && e.message !== "Unexpected end of JSON input") {
        throw e;
      }
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const fetchNetworkElementHealth = async (ne_id: string) => {
  const token = getToken();
  const response = await loggedFetch(`/api/v1/ne/${ne_id}/heartbeat/latest`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

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

export async function powerOffNetworkElement(ne_id: string) {
  const token = getToken();

  const response = await loggedFetch(`/api/v1/ne/${ne_id}/heartbeat/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ healthy: false }),
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

export async function checkLatestHeartbeat(ne_id: string) {
  const token = getToken();
  const response = await loggedFetch(`/api/v1/ne/${ne_id}/heartbeat/latest`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 401) {
    logout();
    throw new Error("Session expired! Please login.");
  }
  if (!response.ok) {
    return null;
  }
  return response.json();
}

export async function checkHeartbeat(ne_id: string) {
  const token = getToken();
  const response = await loggedFetch(`/api/v1/ne/${ne_id}/heartbeat/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ healthy: true }),
  });
  if (response.status === 401) {
    logout();
    throw new Error("Session expired! Please login.");
  }
  if (!response.ok) throw new Error("Failed to check heartbeat");
  return response.json();
}
