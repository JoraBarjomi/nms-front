import { type NetworkElement } from "../../../entities/Element";

export const fetchNetworkElements = async (): Promise<NetworkElement[]> => {
  const response = await fetch("/api/v1/ne");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const fetchDetailedNetworkElementById = async (
  id: string,
): Promise<unknown> => {
  const response = await fetch(`/api/v1/ne/${id}/inventory/latest`, {
    headers: {
      "Accept": "application/json",
    },
  });

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
  const response = await fetch(`/api/v1/ne/${id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => ({}))) as {
      error?: string;
    };
    const message = errorBody.error || `HTTP error! status: ${response.status}`;
    throw new Error(`${message} (${response.status})`);
  }
};

export const syncNetworkElements = async (id: string): Promise<unknown> => {
  const response = await fetch(`/api/v1/ne/${id}/inventory/sync`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => ({}))) as {
      error?: string;
    };
    const message = errorBody.error || `HTTP error! status: ${response.status}`;
    throw new Error(`${message} (${response.status})`);
  }

  return response.json();
};
