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
): Promise<NetworkElement[]> => {
  const response = await fetch(`/api/v1/ne/${id}/inventory/latest`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const deleteNetworkElements = async (id: string): Promise<void> => {
  const response = await fetch(`/api/v1/ne/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

export const syncNetworkElements = async (id: string): Promise<void> => {
  const response = await fetch(`/api/v1/ne/${id}/inventory/sync`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
