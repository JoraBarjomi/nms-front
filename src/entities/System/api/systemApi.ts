export const getSystemHealth = async (): Promise<void> => {
  const response = await fetch(`/healthz`);
  if (!response.ok) {
    const errorBody = (await response.json().catch(() => ({}))) as {
      error?: string;
    };
    const message = errorBody.error || `HTTP error! status: ${response.status}`;
    throw new Error(`${message} (${response.status})`);
  }
  return response.json();
};
