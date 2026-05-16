export async function loggedFetch(url: string, options?: RequestInit) {
  const method = (options?.method ?? "GET").toUpperCase();
  const start = performance.now();

  const log =
    typeof window !== "undefined" && (window as any).__terminalLog
      ? (window as any).__terminalLog
      : console.log;

  log(`REQ -> ${method}:${url}`);

  try {
    const res = await fetch(url, options);
    const ms = (performance.now() - start).toFixed(1);
    log(`RES <- ${res.status} ${url} (${ms}ms)`);
    return res;
  } catch (err: any) {
    const ms = (performance.now() - start).toFixed(1);
    log(`ERR ${url} (${ms}ms ${err.message})`);
    throw err;
  }
}
