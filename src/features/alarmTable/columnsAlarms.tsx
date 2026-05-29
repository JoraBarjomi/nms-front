import { type GridColDef } from "@mui/x-data-grid";
import { Status } from "../../shared/UI/components/Status/Status";
import type { AllSeverities } from "../../shared/constants/allSeverity";
import type { Alarms } from "../../entities/Alarms/Alarms";
import { isToday, isYesterday, format } from "date-fns";

export const alarmTableColumns: GridColDef<Alarms>[] = [
  {
    field: "severity",
    headerName: "Severity",
    flex: 1,
    renderCell: (params) => <Status status={params.value as AllSeverities} />,
  },
  {
    field: "ne_id",
    headerName: "NE_ID",
    flex: 1,
  },
  {
    field: "message",
    headerName: "Message",
    flex: 1,
  },
  {
    field: "created_at",
    headerName: "Created at",
    flex: 1,
    renderCell: (params) => {
      if (!params.value) return "";
      try {
        const date = new Date(params.value);
        if (isToday(date)) return `Today at ${format(date, "HH:mm")}`;
        if (isYesterday(date)) return `Yesterday at ${format(date, "HH:mm")}`;
        return format(date, "dd.MM.yyyy HH:mm");
      } catch {
        return params.value;
      }
    },
  },
];
