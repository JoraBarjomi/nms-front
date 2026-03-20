import { createColumnHelper } from "@tanstack/react-table";
import { Status } from "../../shared/UI/components/StatusAlarms/Status";
import type { Alarms } from "../../entities/Alarms";
import classes from "./columnsAlarms.module.css";

const columnHelper = createColumnHelper<Alarms>();
export const alarmTableColumns = [
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
      const currentStatus = row.original.status;
      return (
        <div className={classes.checkboxDiv}>
          <div className={`${classes.statusDiv} ${classes[currentStatus]}`} />
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
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) => <Status status={info.getValue() as string} />,
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
