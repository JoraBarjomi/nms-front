import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import "./Table.module.css";

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
    status: "closed",
    device: "bs-196",
    probable_cause: "Power supply failure",
    spec_problem: "Ping Failure",
  },
];

const columnHelper = createColumnHelper<Alarms>();

const Table = () => {
  const data = useMemo(() => [...defaultData], []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("status", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((row) => row.device, {
        id: "device",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Device</span>,
      }),
      columnHelper.accessor("probable_cause", {
        header: () => "probable_cause",
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor("spec_problem", {
        header: () => <span>spec_problem</span>,
      }),
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="p-2">
      <table>
        <thead>
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
        <tbody>
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
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};
export default Table;
