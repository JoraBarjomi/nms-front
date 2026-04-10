import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { Status } from "../../shared/UI/components/Status/Status";
import type { AllStatuses } from "../../shared/constants/allStatuses";
import type { NetworkElement } from "../../entities/Element";

const formatId = (id: string | null) => {
  if (!id) return "";
  const parts = id.split("-");
  return `${parts[0]}-${parts[parts.length - 1]}`;
};

export const getElementsTableColumns = (): GridColDef<NetworkElement>[] => [
  {
    field: "id",
    headerName: "ID",
    flex: 0.5,
    minWidth: 90,

    renderCell: (params: GridRenderCellParams) =>
      formatId(params.value as string),
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "address",
    headerName: "Ip address",
    flex: 1,
    minWidth: 140,
  },
  {
    field: "vendor",
    headerName: "Vendor",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.7,
    minWidth: 80,
    renderCell: (params: GridRenderCellParams) => (
      <Status status={params.value as AllStatuses} />
    ),
  },
];
