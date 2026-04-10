import { useEffect, useMemo, useState, useCallback } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridRowId,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";
import {
  Box,
  Paper,
  Stack,
  Drawer,
  Typography,
  Divider,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type TableProps<TData extends { id: GridRowId }> = {
  rows: TData[];
  columns: GridColDef<TData>[];
  title?: string;
  renderDetails?: (row: TData, additionalData: any) => React.ReactNode;
  fetchDetails?: (id: GridRowId) => Promise<any>;
};

const Table = <TData extends { id: GridRowId }>({
  rows,
  columns,
  title = "Table",
  renderDetails,
  fetchDetails,
}: TableProps<TData>) => {
  const [search, setSearch] = useState("");
  const [selectedRowId, setSelectedRowId] = useState<GridRowId | null>(
    rows[0]?.id ?? null,
  );
  const [detailOpen, setDetailOpen] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>({
      type: "include",
      ids: new Set<GridRowId>(),
    });

  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const [additionalData, setAdditionalData] = useState<any>(null);

  useEffect(() => {
    if (
      selectedRowId !== null &&
      !rows.some((row) => row.id === selectedRowId)
    ) {
      setSelectedRowId(rows[0]?.id ?? null);
      return;
    }

    if (selectedRowId === null && rows[0]) {
      setSelectedRowId(rows[0].id);
    }
  }, [rows, selectedRowId]);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rows;

    return rows.filter((row) => {
      try {
        return JSON.stringify(row).toLowerCase().includes(query);
      } catch {
        return false;
      }
    });
  }, [rows, search]);

  const selectedRow = useMemo(
    () => rows.find((row) => row.id === selectedRowId) ?? null,
    [rows, selectedRowId],
  );

  const handleOpenDetails = useCallback(
    async (id: GridRowId) => {
      setSelectedRowId(id);
      setDetailOpen(true);
      setDetailsError(null);
      setAdditionalData(null);

      if (fetchDetails) {
        setDetailsLoading(true);
        try {
          const data = await fetchDetails(id);
          setAdditionalData(data);
        } catch (error) {
          console.log("Failed to fetch details:", error);
          const errorMes = (error as any)?.message || error?.toString();
          if (errorMes?.includes("404") || errorMes.includes("404")) {
            setAdditionalData({ notSynced: true });
          } else {
            setDetailsError("Failed to load detailed information.");
          }
        } finally {
          setDetailsLoading(false);
        }
      }
    },
    [fetchDetails],
  );

  const handleSelectAllVisible = useCallback(() => {
    setRowSelectionModel({
      type: "include",
      ids: new Set(filteredRows.map((row) => row.id)),
    });
  }, [filteredRows]);

  const handleClearSelection = useCallback(() => {
    setRowSelectionModel({
      type: "include",
      ids: new Set<GridRowId>(),
    });
  }, []);

  const handleCloseDrawer = () => {
    setDetailOpen(false);
    setDetailsError(null);
    setAdditionalData(null);
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          fontFamily: (theme) => theme.typography.fontFamily,
          fontSize: (theme) => theme.typography.body2.fontSize,
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            borderBottom: "none",
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderBottom: "1px solid",
              borderColor: (theme) => theme.palette.grey[700],

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex" }}>
              <Button
                size="small"
                variant="outlined"
                onClick={handleSelectAllVisible}
                sx={{
                  height: 40,
                  minWidth: "auto",
                  px: 2,
                }}
              >
                All
              </Button>

              <Button
                size="small"
                variant="outlined"
                onClick={handleClearSelection}
                sx={{
                  height: 40,
                  minWidth: "auto",
                  px: 2,
                }}
              >
                Clear
              </Button>
            </Box>

            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              label="Search"
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ width: 260 }}
            />
          </Box>

          <Box
            sx={{
              height: "70vh",
              width: "100%",
              backgroundColor: "transparent",
            }}
          >
            <DataGrid
              autoHeight
              rows={filteredRows}
              columns={columns}
              checkboxSelection
              onRowClick={(params) => {
                handleOpenDetails(params.id);
              }}
              disableRowSelectionOnClick
              keepNonExistentRowsSelected
              rowSelectionModel={rowSelectionModel}
              onRowSelectionModelChange={setRowSelectionModel}
              pageSizeOptions={[10, 25, 50]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10, page: 0 },
                },
              }}
              sx={{
                border: 0,
                fontSize: 17,
                "& .MuiDataGrid-main": { border: "none", outline: "none" },
                "& .MuiDataGrid-virtualScroller": {
                  border: "none",
                  outline: "none",
                },
                "& .MuiDataGrid-root": { border: "none", outline: "none" },
                "& .MuiDataGrid-virtualScrollerContent": { border: "none" },
                "& .MuiDataGrid-virtualScrollerRenderZone": { border: "none" },
                "& .MuiDataGrid-footerContainer": {
                  border: "none",
                  borderTop: (theme) =>
                    `1px solid ${theme.palette.grey[700]} !important`,
                  borderBottom: "none !important",
                },
                "& .MuiDataGrid-pinnedColumns": { border: "none !important" },
                "& .MuiDataGrid-pinnedColumnsHeaders": {
                  border: "none !important",
                },
                "& .MuiDataGrid-pinnedColumnsBody": {
                  border: "none !important",
                },
                "& .MuiDataGrid-cell": {
                  borderTop: "none !important",
                  borderBottom: (theme) =>
                    `1px solid ${theme.palette.grey[700]} !important`,
                  borderLeft: "none !important",
                  borderRight: "none !important",
                  outline: "none",
                  boxShadow: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                  border: "none !important",
                  borderBottom: (theme) =>
                    `1px solid ${theme.palette.grey[700]} !important`,
                },
                "& .MuiDataGrid-row": {
                  border: "none !important",
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                  "&.Mui-selected": {
                    backgroundColor: (theme) => theme.palette.action.selected,
                  },
                },

                "& .MuiDataGrid-columnSeparator": {
                  display: "none",
                },

                "& .MuiDataGrid-withBorderColor": {
                  borderColor: (theme) =>
                    `${theme.palette.grey[700]} !important`,
                },
              }}
            />
          </Box>
        </Paper>
      </Box>

      <Drawer
        anchor="right"
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 420, md: 520 },
            p: 2,
          },
        }}
      >
        <Stack spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
          </Stack>

          <Divider />

          {detailsLoading && (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          )}

          {detailsError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {detailsError}
            </Alert>
          )}

          {!detailsLoading && !detailsError && selectedRow && renderDetails && (
            <>{renderDetails(selectedRow, additionalData)}</>
          )}

          {!detailsLoading &&
            !detailsError &&
            !renderDetails &&
            selectedRow && (
              <Typography variant="body2" color="text.secondary">
                No details available.
              </Typography>
            )}
        </Stack>
      </Drawer>
    </Box>
  );
};

export default Table;
