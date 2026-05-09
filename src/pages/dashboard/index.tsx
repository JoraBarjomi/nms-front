import { Paper, Typography, Grid, Box } from "@mui/material";
import Chart from "react-apexcharts";
import { type ApexOptions } from "apexcharts";

const generateData = (count: number, yrange: { min: number; max: number }) => {
  let i = 0;
  const series: [number, number][] = [];
  const now = new Date().getTime();
  while (i < count) {
    const x = now - (count - i) * 60000;
    const y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    series.push([x, y]);
    i++;
  }
  return series;
};

export function DashboardPage() {
  const trafficOptions: ApexOptions = {
    chart: {
      type: "area",
      background: "transparent",
      animations: { enabled: false },
      toolbar: { show: false },
    },
    theme: { mode: "dark" },
    colors: ["#66bb6a"],
    stroke: { curve: "stepline", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      type: "datetime",
      labels: { datetimeUTC: false },
      tooltip: { enabled: false },
    },
    yaxis: { title: { text: "Mbps" } },
    grid: {
      borderColor: "#333",
      strokeDashArray: 4,
    },
  };

  const trafficSeries = [
    { name: "Uplink Traffic", data: generateData(20, { min: 10, max: 90 }) },
  ];

  const resourceOptions: ApexOptions = {
    chart: {
      type: "line",
      background: "transparent",
      animations: { enabled: false },
      toolbar: { show: false },
    },
    theme: { mode: "dark" },
    colors: ["#f44336", "#ffa726"],
    stroke: { curve: "smooth", width: 2 },
    dataLabels: { enabled: false },
    xaxis: {
      type: "datetime",
      labels: { datetimeUTC: false },
    },
    yaxis: {
      title: { text: "Load" },
      max: 100,
      min: 0,
    },
    grid: {
      borderColor: "#333",
      strokeDashArray: 4,
    },
    legend: { position: "top", horizontalAlign: "right" },
  };

  const resourceSeries = [
    { name: "CPU Load", data: generateData(20, { min: 30, max: 85 }) },
    { name: "RAM Usage", data: generateData(20, { min: 50, max: 70 }) },
  ];

  return (
    <Box sx={{ width: "100%", pt: 1 }}>
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
            <Typography variant="h6" gutterBottom>
              Eth0 Interface Traffic
            </Typography>
            <Chart
              options={trafficOptions}
              series={trafficSeries}
              type="area"
              height={350}
            />
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
            <Typography variant="h6" gutterBottom>
              Core Nodes Load
            </Typography>
            <Chart
              options={resourceOptions}
              series={resourceSeries}
              type="line"
              height={350}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
