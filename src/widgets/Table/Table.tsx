import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

type TableProps<TData extends { id: GridRowId }> = {
  rows: TData[];
  columns: GridColDef<TData>[];
  title?: string;
  renderDetails?: (row: TData, additionalData: any) => React.ReactNode;
  fetchDetails?: (id: GridRowId) => Promise<any>;
};

const Table = <TData extends { id: GridRowId }>({
  rows = [],
  columns = [],
  title = "Table",
  renderDetails,
  fetchDetails,
}: TableProps<TData>) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const safeRows = rows ?? [];
  const safeColumns = columns ?? [];
  const [selectedRowId, setSelectedRowId] = useState<GridRowId | null>(
    safeRows?.[0]?.id ?? null,
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
    if (!safeRows || safeRows.length === 0) {
      setSelectedRowId(null);
      return;
    }

    if (
      selectedRowId !== null &&
      !safeRows.some((row) => row?.id === selectedRowId)
    ) {
      setSelectedRowId(safeRows[0]?.id ?? null);
      return;
    }

    if (selectedRowId === null && safeRows[0]) {
      setSelectedRowId(safeRows[0].id);
    }
  }, [safeRows, selectedRowId]);

  const filteredRows = useMemo(() => {
    if (!safeRows || safeRows.length === 0) return [];
    const query = search.trim().toLowerCase();
    if (!query) return safeRows;

    return safeRows.filter((row) => {
      try {
        return row && JSON.stringify(row).toLowerCase().includes(query);
      } catch {
        return false;
      }
    });
  }, [safeRows, search]);

  const selectedRow = useMemo(
    () => safeRows?.find((row) => row?.id === selectedRowId) ?? null,
    [safeRows, selectedRowId],
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

              <Button
                size="small"
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => navigate("/elements/add")}
              >
                Add Element
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
              rows={filteredRows ?? []}
              columns={safeColumns ?? []}
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
                    backgroundColor: "transparent !important",
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.action.hover,
                    },
                  },
                },

                "& .MuiDataGrid-cell:focus": {
                  outline: "none !important",
                },
                "& .MuiDataGrid-cell:focus-within": {
                  outline: "none !important",
                },

                "& .MuiDataGrid-columnHeader:focus": {
                  outline: "none !important",
                },
                "& .MuiDataGrid-columnHeader:focus-within": {
                  outline: "none !important",
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
            p: 0,
          },
        }}
      >
        <Stack spacing={0}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              p: 2,
              pb: 2,
              pr: 2,
              pl: 2.5,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <IconButton onClick={() => setDetailOpen(false)}>
              <CloseIcon />
            </IconButton>
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
            <>{renderDetails(selectedRow, additionalData ?? null)}</>
          )}

          {!detailsLoading &&
            !detailsError &&
            !renderDetails &&
            selectedRow && (
              <Typography variant="body2" color="text.secondary">
                No details available.
              </Typography>
            )}

          {!detailsLoading && !detailsError && !selectedRow && (
            <Typography variant="body2" color="text.secondary">
              No data selected.
            </Typography>
          )}
        </Stack>
      </Drawer>
    </Box>
  );
};

export default Table;
