import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";

import { HeartbeatIcon } from "../../shared/UI/icons/icons";
import Chart from "react-apexcharts";
import { type ApexOptions } from "apexcharts";
import { Card } from "../../shared/UI/components/Card/Card";

const PROM_BASE_URL = "http://localhost:9090/api/v1";

const formatUptime = (secondsStr: string): string => {
  const totalSeconds = parseInt(secondsStr, 10);
  if (isNaN(totalSeconds) || totalSeconds < 0) return "N/A";
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
};

const formatChartData = (
  result: any[],
  scaleFn: (val: number) => number = (v) => v,
) => {
  if (!result || result.length === 0) return [];
  const values = result[0].values;
  return values.map((point: any) => {
    let yVal = parseFloat(point[1]);
    if (isNaN(yVal) || point[1] === "NaN" || !isFinite(yVal)) yVal = 0;
    return {
      x: point[0] * 1000,
      y: scaleFn(yVal),
    };
  });
};

const getChartOptions = (
  _: string,
  color: string | string[],
  yAxisLabel: string,
  type: "area" | "line" | "bar" = "area",
  formatY: (val: number) => string = (val) => val.toFixed(0),
): ApexOptions => ({
  chart: {
    type: type,
    background: "transparent",
    animations: { enabled: false },
    toolbar: { show: false },
  },
  theme: { mode: "dark" },
  colors: Array.isArray(color) ? color : [color],
  stroke: { curve: "smooth", width: type === "bar" ? 0 : 2 },
  fill: {
    type: type === "area" ? "gradient" : "solid",
    gradient:
      type === "area"
        ? {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0.05,
            stops: [0, 100],
          }
        : undefined,
  },
  dataLabels: { enabled: false },
  legend: { position: "top", horizontalAlign: "right" },
  xaxis: {
    type: "datetime",
    labels: { datetimeUTC: false },
    tooltip: { enabled: false },
  },
  yaxis: {
    title: { text: yAxisLabel },
    min: 0,
    labels: {
      formatter: formatY,
    },
  },
  grid: {
    borderColor: "#333",
    strokeDashArray: 4,
  },
  tooltip: {
    theme: "dark",
    y: {
      formatter: formatY,
    },
  },
});

export function DashboardPage() {
  const [metrics, setMetrics] = useState({
    upStatus: "N/A",
    uptime: "N/A",
    sessions: "0",
    memory: "0 MB",
    goroutines: "0",
  });

  const [charts, setCharts] = useState({
    sessions: [] as { x: number; y: number }[],
    errors: [] as { x: number; y: number }[],
    memory: [] as { x: number; y: number }[],
    goroutines: [] as { x: number; y: number }[],
    cpu: [] as { x: number; y: number }[],
    latencyP95: [] as { x: number; y: number }[],
    traps: [] as { x: number; y: number }[],
    networkRx: [] as { x: number; y: number }[],
    networkTx: [] as { x: number; y: number }[],
    gcLoad: [] as { x: number; y: number }[],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const instantQueries = [
          "up",
          "time() - process_start_time_seconds",
          "netconf_sessions_active",
          "process_resident_memory_bytes",
          "go_goroutines",
        ];

        const instantResults = await Promise.all(
          instantQueries.map((q) =>
            fetch(`${PROM_BASE_URL}/query?query=${encodeURIComponent(q)}`).then(
              (res) => {
                if (!res.ok)
                  throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
              },
            ),
          ),
        );

        const getValue = (res: any) => {
          if (res?.data?.result && res.data.result.length > 0) {
            return res.data.result[0].value[1];
          }
          return "0";
        };

        const memBytes = parseFloat(getValue(instantResults[3]));
        const memMB = !isNaN(memBytes)
          ? (memBytes / (1024 * 1024)).toFixed(2) + " MB"
          : "0 MB";

        setMetrics({
          upStatus: getValue(instantResults[0]) === "1" ? "Online" : "Offline",
          uptime: formatUptime(getValue(instantResults[1])),
          sessions: getValue(instantResults[2]),
          memory: memMB,
          goroutines: getValue(instantResults[4]),
        });

        const end = Math.floor(Date.now() / 1000);
        const start = end - 3600;
        const step = 60;

        const historyQueries = [
          "netconf_sessions_active",
          "inventory_sync_errors_total",
          "process_resident_memory_bytes",
          "go_goroutines",
          "rate(process_cpu_seconds_total[5m]) * 100",
          "histogram_quantile(0.95, sum(rate(netconf_rpc_duration_seconds_bucket[5m])) by (le))",
          "rate(netconf_notifications_received_total[5m])",
          "rate(process_network_receive_bytes_total[5m])",
          "rate(process_network_transmit_bytes_total[5m])",
          "rate(go_gc_duration_seconds_sum[5m]) * 100",
        ];

        const historyResults = await Promise.all(
          historyQueries.map((q) =>
            fetch(
              `${PROM_BASE_URL}/query_range?query=${encodeURIComponent(q)}&start=${start}&end=${end}&step=${step}`,
            ).then((res) => res.json()),
          ),
        );

        setCharts({
          sessions: formatChartData(historyResults[0]?.data?.result),
          errors: formatChartData(historyResults[1]?.data?.result, (val) =>
            parseFloat(val.toFixed(0)),
          ),
          memory: formatChartData(historyResults[2]?.data?.result, (val) =>
            parseFloat((val / (1024 * 1024)).toFixed(2)),
          ),
          goroutines: formatChartData(historyResults[3]?.data?.result),
          cpu: formatChartData(historyResults[4]?.data?.result, (val) =>
            parseFloat(val.toFixed(2)),
          ),
          latencyP95: formatChartData(historyResults[5]?.data?.result, (val) =>
            parseFloat((val * 1000).toFixed(2)),
          ),
          traps: formatChartData(historyResults[6]?.data?.result, (val) =>
            parseFloat(val.toFixed(2)),
          ),
          networkRx: formatChartData(historyResults[7]?.data?.result, (val) =>
            parseFloat((val / 1024).toFixed(2)),
          ),
          networkTx: formatChartData(historyResults[8]?.data?.result, (val) =>
            parseFloat((val / 1024).toFixed(2)),
          ),
          gcLoad: formatChartData(historyResults[9]?.data?.result, (val) =>
            parseFloat(val.toFixed(3)),
          ),
        });

        setError(null);
      } catch (err) {
        console.error("Failed to fetch Prometheus metrics:", err);
        setError("Failed to connect Prometheus. Check localhost:9090");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", pt: 1 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Card
          title={"System health"}
          icon={HeartbeatIcon}
          text={metrics.upStatus}
        />
        <Card title="Uptime" text={metrics.uptime} />
        <Card title="Active Sessions" text={metrics.sessions} />
        <Card title="RAM" text={metrics.memory} />
        <Card title="Goroutines" text={metrics.goroutines} />
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="subtitle1" gutterBottom color="text.secondary">
              Server Network Traffic
            </Typography>
            {charts.networkRx.length > 0 || charts.networkTx.length > 0 ? (
              <Chart
                options={getChartOptions(
                  "Network",
                  ["#4caf50", "#2196f3"],
                  "KB/s",
                  "area",
                  (val) => val.toFixed(1) + " KB/s",
                )}
                series={[
                  { name: "Rx (Receive)", data: charts.networkRx },
                  { name: "Tx (Transmit)", data: charts.networkTx },
                ]}
                type="area"
                height={300}
              />
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={300}
              >
                <Typography color="text.secondary">
                  Waiting for Network data...
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="subtitle1" gutterBottom color="text.secondary">
              Active NETCONF Sessions
            </Typography>
            {charts.sessions.length > 0 ? (
              <Chart
                options={getChartOptions("Sessions", "#66bb6a", "Count")}
                series={[{ name: "Sessions", data: charts.sessions }]}
                type="area"
                height={300}
              />
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={300}
              >
                <Typography color="text.secondary">
                  Waiting for data...
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="subtitle1" gutterBottom color="text.secondary">
              Sync Errors
            </Typography>
            {charts.errors.length > 0 ? (
              <Chart
                options={getChartOptions(
                  "Errors",
                  "#ef5350",
                  "Count",
                  "area",
                  (val) => val.toFixed(0),
                )}
                series={[{ name: "Sync Errors", data: charts.errors }]}
                type="area"
                height={300}
              />
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={300}
              >
                <Typography color="text.secondary">
                  Waiting for error data...
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Typography
        variant="h6"
        gutterBottom
        sx={{ mb: 2, color: "text.secondary" }}
      >
        System Resources
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="subtitle1" gutterBottom color="text.secondary">
              CPU Usage
            </Typography>
            {charts.cpu.length > 0 ? (
              <Chart
                options={getChartOptions(
                  "CPU",
                  "#ab47bc",
                  "CPU %",
                  "line",
                  (val) => val.toFixed(1) + "%",
                )}
                series={[{ name: "CPU Load", data: charts.cpu }]}
                type="line"
                height={300}
              />
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={300}
              >
                <Typography color="text.secondary">
                  Waiting for CPU data...
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="subtitle1" gutterBottom color="text.secondary">
              RAM Usage
            </Typography>
            {charts.memory.length > 0 ? (
              <Chart
                options={getChartOptions(
                  "Memory",
                  "#29b6f6",
                  "Memory (MB)",
                  "area",
                  (val) => val.toFixed(0) + " MB",
                )}
                series={[{ name: "Memory", data: charts.memory }]}
                type="area"
                height={300}
              />
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={300}
              >
                <Typography color="text.secondary">
                  Waiting for data...
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="subtitle1" gutterBottom color="text.secondary">
              Goroutines
            </Typography>
            {charts.goroutines.length > 0 ? (
              <Chart
                options={getChartOptions(
                  "Goroutines",
                  "#ffa726",
                  "Count",
                  "area",
                )}
                series={[{ name: "Goroutines", data: charts.goroutines }]}
                type="area"
                height={300}
              />
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={300}
              >
                <Typography color="text.secondary">
                  Waiting for data...
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="subtitle1" gutterBottom color="text.secondary">
              Garbage Collector Load
            </Typography>
            {charts.gcLoad.length > 0 ? (
              <Chart
                options={getChartOptions(
                  "GC Load",
                  "#00acc1",
                  "GC %",
                  "line",
                  (val) => val.toFixed(3) + "%",
                )}
                series={[{ name: "GC Load", data: charts.gcLoad }]}
                type="line"
                height={300}
              />
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={300}
              >
                <Typography color="text.secondary">
                  Waiting for GC data...
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
