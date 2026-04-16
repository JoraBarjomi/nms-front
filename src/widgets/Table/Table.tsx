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
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderBottom: "1px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.02)"
                  : "rgba(0, 0, 0, 0.01)",
            }}
          >
            <Box sx={{ gap: 2, display: "flex" }}>
              <Button
                size="small"
                variant="outlined"
                onClick={handleSelectAllVisible}
                sx={{ height: 36, px: 2 }}
              >
                Select All
              </Button>

              <Button
                size="small"
                variant="outlined"
                onClick={handleClearSelection}
                sx={{ height: 36, px: 2 }}
              >
                Clear
              </Button>

              <Button
                size="small"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate("/elements/add")}
                sx={{ height: 36 }}
              >
                Add
              </Button>
            </Box>

            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              placeholder="Search..."
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ width: 260 }}
            />
          </Box>

          <Box
            sx={{
              height: "70vh", // Таблица будет занимать 70% высоты экрана
              width: "100%",
            }}
          >
            <DataGrid
              rows={filteredRows ?? []}
              columns={safeColumns ?? []}
              checkboxSelection
              onRowClick={(params) => {
                handleOpenDetails(params.id);
              }}
              disableRowSelectionOnClick
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
                fontSize: "0.95rem",
                "& .MuiDataGrid-main": { border: "none" },
                "& .MuiDataGrid-columnHeaders": {
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.03)"
                      : "rgba(0, 0, 0, 0.02)",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  outline: "none !important",
                },
                "& .MuiDataGrid-row": {
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                  "&.Mui-selected": {
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(66, 103, 177, 0.15) !important"
                        : "rgba(66, 103, 177, 0.08) !important",
                    "&:hover": {
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "rgba(66, 103, 177, 0.25) !important"
                          : "rgba(66, 103, 177, 0.12) !important",
                    },
                  },
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: 600,
                  color: "text.secondary",
                },
                "& .MuiDataGrid-columnSeparator": {
                  display: "none",
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
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "-4px 0 20px rgba(0,0,0,0.5)"
                : "-4px 0 20px rgba(0,0,0,0.05)",
          },
        }}
      >
        <Stack spacing={0} sx={{ height: "100%" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 2, pl: 2.5 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Details
            </Typography>
            <IconButton onClick={() => setDetailOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider />

          <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            {detailsLoading && (
              <Box display="flex" justifyContent="center" py={8}>
                <CircularProgress size={32} />
              </Box>
            )}

            {detailsError && (
              <Box p={3}>
                <Alert severity="error">{detailsError}</Alert>
              </Box>
            )}

            {!detailsLoading &&
              !detailsError &&
              selectedRow &&
              renderDetails && (
                <>{renderDetails(selectedRow, additionalData ?? null)}</>
              )}
          </Box>
        </Stack>
      </Drawer>
    </Box>
  );
};

export default Table;
