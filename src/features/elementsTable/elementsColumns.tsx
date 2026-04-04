import { createColumnHelper } from "@tanstack/react-table";
import { Status } from "../../shared/UI/components/Status/Status";
import type { AllStatuses } from "../../shared/constants/allStatuses";
import type { NetworkElement } from "../../entities/Element";
import { Checkbox } from "../../shared/UI/components/Checkbox/Checkbox";
// import { GridColDef } from "@mui/x-data-grid";

const columnHelper = createColumnHelper<NetworkElement>();

const formatId = (id: string | null) => {
  if (!id) return "";
  const parts = id.split("-");
  return `${parts[0]}-${parts[parts.length - 1]}`;
};

// export const elementsGridColumns: GridColDef[] = [
//   {field: 'id', headerName: 'ID', width: 150, valueFormatter: ({ value }: { value: string }) => formatId(value)},
//   {field: 'name', headerName: 'Name', flex: 1},
//   {field: 'address', headerName: 'Ip address', flex: 1},
//   {field: 'vendor', headerName: 'Vendor', width: 150},
//   {field: 'status', headerName: 'Status', width: 120, renderCell: ({ params }: { params: string }) => <Status status={params.value as AllStatuses} />},
// ];

export const elementsTableColumns = [
  columnHelper.display({
    id: "selected",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      );
    },
  }),
  columnHelper.accessor("id", {
    header: () => "ID",
    cell: (info) => formatId(info.renderValue()),
  }),
  columnHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("address", {
    header: () => "Ip address",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("vendor", {
    header: () => "Vendor",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) => <Status status={info.getValue() as AllStatuses} />,
  }),
];
