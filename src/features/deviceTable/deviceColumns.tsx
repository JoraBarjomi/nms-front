import { createColumnHelper } from "@tanstack/react-table";
import { Status } from "../../shared/UI/components/Status/Status";
import type { Device } from "../../entities/Device";
import type { AllStatuses } from "../../shared/constants/allStatuses";
import { Checkbox } from "../../shared/UI/components/Checkbox/Checkbox";

const columnHelper = createColumnHelper<Device>();
export const deviceTableColumns = [
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
  columnHelper.accessor("device", {
    header: () => "Device name",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("type", {
    header: () => "Type",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("uptime", {
    header: () => "Uptime",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("load", {
    header: () => "Load",
    cell: (info) => `${info.renderValue()}%`,
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) => <Status status={info.getValue() as AllStatuses} />,
  }),
];
