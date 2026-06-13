import { useEffect, useState, useMemo } from "react";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import { Card } from "../../shared/UI/components/Card/Card";
import { CardStatus } from "../../shared/UI/components/Card/CardStatus/CardStatus";

import {
  HeartbeatIcon,
  AlarmsIcon,
  DownIcon,
  UpIcon,
  MaintIcon,
  PlotIcon,
} from "../../shared/UI/icons/icons";

import { type Alarms } from "../../entities/Alarms/Alarms";
import { fetchAlarms } from "../../entities/Alarms/api/apiAlarms";
import { alarmTableColumns } from "../../features/alarmTable/columnsAlarms";
import { exportAlarmsToCsv, exportAlarmsToPdf } from "../../features/alarmTable/exportUtils";

import Table from "../../widgets/Table/Table";

export function AlarmsPage() {
  const [alarms, setAlarms] = useState<Alarms[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchAlarms({ limit: 100 })
      .then((data) => {
        const eventList = Array.isArray(data)
          ? data
          : (data as any)?.events || (data as any)?.data || [];
        const mappedAlarms = eventList.map((item: any, index: number) => ({
          ...item,
          id: item.id || item._id || item.event_id || `alarm-${index}`,
          severity: item.severity ? item.severity.toLowerCase() : "warning",
        }));

        setAlarms(mappedAlarms);
        setError(null);
      })
      .catch((err) => {
        console.error("ALARM FETCH ERROR:", err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const stats = useMemo(() => {
    return {
      total: alarms.length,
      active: alarms.length,
      critical: alarms.filter((a) => a.severity === "critical").length,
      major: alarms.filter((a) => a.severity === "major").length,
      warning: alarms.filter((a) => a.severity === "warning").length,
      closed: 0,
    };
  }, [alarms]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error" variant="h6">
          Error fetching alarms: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Card
          size="medium"
          title={"Alarms"}
          text={stats.active}
          icon={AlarmsIcon}
        />

        <Card
          size="medium"
          title={"Active"}
          text={stats.active}
          icon={HeartbeatIcon}
        />

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            display: { xs: "none", lg: "block" },
            borderColor: "transparent",
          }}
        />

        <CardStatus
          size="medium"
          title={"Critical"}
          text={stats.critical}
          icon={DownIcon}
          status={"critical"}
        />
        <CardStatus
          size="medium"
          title={"Major"}
          text={stats.major}
          icon={PlotIcon}
          status={"major"}
        />
        <CardStatus
          size="medium"
          title={"Warning"}
          text={stats.warning}
          icon={MaintIcon}
          status={"warning"}
        />
        <CardStatus
          size="medium"
          title={"Closed"}
          text={stats.closed}
          icon={UpIcon}
          status={"closed"}
        />
      </Box>

      <Box>
        <Table
          rows={alarms}
          columns={alarmTableColumns}
          onExportCsv={() => exportAlarmsToCsv(alarms)}
          onExportPdf={() => exportAlarmsToPdf(alarms)}
        />
      </Box>
    </Box>
  );
}
