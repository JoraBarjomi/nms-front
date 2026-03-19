import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import classes from "./Table.module.css";

import { Status } from "../Status/Status";

type Alarms = {
  status: string;
  device: string;
  probable_cause: string;
  spec_problem: string;
};

const defaultData: Alarms[] = [
  {
    status: "critical",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "major",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "warning",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "critical",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "critical",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "major",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "warning",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "critical",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
  {
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
];

const columnHelper = createColumnHelper<Alarms>();

const Table = () => {
  const data = useMemo(() => [...defaultData], []);
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "selected",
        size: 50,
        header: ({ table }) => (
          <div className={classes.checkboxDiv}>
            <input
              type="checkbox"
              className={classes.checkbox}
              checked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllPageRowsSelectedHandler()}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className={classes.checkboxDiv}>
            <input
              type="checkbox"
              className={classes.checkbox}
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onChange={row.getToggleSelectedHandler()}
            />
          </div>
        ),
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
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className={classes.table_div}>
      <table>
        <thead className={classes.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={classes.tbody}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
