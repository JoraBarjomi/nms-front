import { type GridColDef } from "@mui/x-data-grid";
import { Status } from "../../shared/UI/components/Status/Status";
import type { AllStatuses } from "../../shared/constants/allStatuses";
import type { Alarms } from "../../entities/Alarms";

export const alarmTableColumns: GridColDef<Alarms>[] = [
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => <Status status={params.value as AllStatuses} />,
  },
  {
    field: "device",
    headerName: "Device",
    flex: 1,
  },
  {
    field: "probable_cause",
    headerName: "Probable Cause",
    flex: 1,
  },
  {
    field: "spec_problem",
    headerName: "Specific Problem",
    flex: 1,
  },
  {
    field: "details",
    headerName: "Details",
    flex: 0.5,
    renderCell: () => null,
  },
];
