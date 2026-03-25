import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type SortingState,
  type ColumnDef,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import classes from "./Table.module.css";
import { UpIcon, DownIcon } from "../../shared/UI/icons/icons";

type TableProps<TData> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columnsTable: ColumnDef<TData, any>[];
  dataTable: TData[];
  renderDetails?: (row: TData) => React.ReactNode;
};

const Table = <TData,>({
  columnsTable,
  dataTable,
  renderDetails,
}: TableProps<TData>) => {
  const data = useMemo(() => [...dataTable], [dataTable]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRow, setSelectedRow] = useState<TData | null>(null);

  const table = useReactTable({
    data,
    columns: columnsTable,
    state: { rowSelection, sorting, globalFilter },
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <div className={classes.table_div}>
      <div className={classes.searchDiv}>
        <input
          className={classes.searchbar}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(String(e.target.value))}
          placeholder="Search"
        />
      </div>
      <table>
        <thead className={classes.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}{" "}
                      {{
                        asc: <UpIcon />,
                        desc: <DownIcon />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={classes.tbody}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} onClick={() => setSelectedRow(row.original)}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRow && renderDetails && (
        <div className={classes.detailsPanel}>
          <div className={classes.wrapper}>
            <button
              className={classes.exitButton}
              onClick={() => setSelectedRow(null)}
            >
              X
            </button>
            {renderDetails(selectedRow)}
          </div>
        </div>
      )}
    </div>
  );
};
export default Table;
