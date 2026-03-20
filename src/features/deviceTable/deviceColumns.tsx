import { createColumnHelper } from "@tanstack/react-table";
import { Status } from "../../shared/UI/components/StatusDevices/Status";
import type { Device } from "../../entities/Device";
import classes from "./deviceColumns.module.css";

const columnHelper = createColumnHelper<Device>();
export const deviceTableColumns = [
  columnHelper.display({
    id: "selected",
    header: ({ table }) => (
      <div className={classes.checkboxDiv}>
        <div className={classes.statusDiv} />
        <input
          type="checkbox"
          className={classes.checkbox}
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className={classes.checkboxDiv}>
          <div className={classes.statusDiv} />
          <input
            type="checkbox"
            className={classes.checkbox}
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        </div>
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
    cell: (info) => <Status status={info.getValue() as string} />,
  }),
];
