import { createColumnHelper } from "@tanstack/react-table";
import { Status } from "../../shared/UI/components/Status/Status";
import type { Alarms } from "../../entities/Alarms";
import type { AllStatuses } from "../../shared/constants/allStatuses";
import { Checkbox } from "../../shared/UI/components/Checkbox/Checkbox";

const columnHelper = createColumnHelper<Alarms>();
export const alarmTableColumns = [
  columnHelper.display({
    id: "selected",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => {
      const currentStatus = row.original.status;
      return (
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
          status={currentStatus}
        />
      );
    },
  }),
  columnHelper.accessor("status", {
    header: () => "Status",

    cell: (info) => <Status status={info.getValue() as AllStatuses} />,
  }),
  columnHelper.accessor("device", {
    header: () => "Device",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("probable_cause", {
    header: () => "Probable Cause",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("spec_problem", {
    header: () => "Specific Problem",
    cell: (info) => info.renderValue(),
  }),
];
