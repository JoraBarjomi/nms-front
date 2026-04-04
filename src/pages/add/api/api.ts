export async function createNetworkElement(formData: {
  name: string;
  ipAddress: string;
  vendor: string;
  capabilities: string;
}) {
  const payload = {
    name: formData.name,
    address: formData.ipAddress,
    vendor: formData.vendor,
    capabilities: formData.capabilities
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };

  const response = await fetch("/api/v1/ne", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
