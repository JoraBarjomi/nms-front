import { type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import { Status } from "../../shared/UI/components/Status/Status";
import type { AllStatuses } from "../../shared/constants/allStatuses";
import type { Device } from "../../entities/Device";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";

export const deviceTableColumns = (
  onOpenDetails: (id: string) => void,
): GridColDef<Device>[] => [
  {
    field: "device",
    headerName: "Device name",
    flex: 1,
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
  },
  {
    field: "uptime",
    headerName: "Uptime",
    flex: 1,
  },
  {
    field: "load",
    headerName: "Load",
    flex: 1,
    valueFormatter: (params: { value: number }) => `${params.value}%`,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params: GridRenderCellParams<Device, AllStatuses>) => (
      <Status status={params.value} />
    ),
  },
  {
    field: "details",
    headerName: "",
    minWidth: 80,
    maxWidth: 100,
    resizable: false,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: "center",
    renderCell: (params: GridRenderCellParams<Device>) => (
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onOpenDetails(params.row.device);
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
    ),
  },
];
