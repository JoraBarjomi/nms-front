import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchNetworkElements,
  fetchDetailedNetworkElementById,
  deleteNetworkElements,
  syncNetworkElements,
  powerOffNetworkElement,
  checkLatestHeartbeat,
  checkHeartbeat,
} from "../../entities/Element/api/apiElement";
import { createTestAlarm } from "../../entities/Alarms/api/apiAlarms";
import { type NetworkElement } from "../../entities/Element/Element";
import { getElementsTableColumns } from "../../features/elementsTable/elementsColumns";
import Table from "../../widgets/Table/Table";
import { type AllStatuses } from "../../shared/constants/allStatuses";
import { Status } from "../../shared/UI/components/Status/Status";

import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Slide,
  type SlideProps,
  useTheme,
  IconButton,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";

import { type GridRowId } from "@mui/x-data-grid";
import SyncIcon from "@mui/icons-material/Sync";
import { Delete as DeleteIcon, NetworkCell } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AlertIcon } from "../../shared/UI/icons/icons";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

const fetchElementDetails = async (id: GridRowId) => {
  return await fetchDetailedNetworkElementById(id as string);
};

function HeartbeatDisplay({
  ne_id,
  refreshKey = 0,
}: {
  ne_id: string;
  refreshKey: number;
}) {
  const [heartbeat, setHeartbeat] = useState<{
    healthy: boolean;
    checked_at: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    checkLatestHeartbeat(ne_id)
      .then((data) => setHeartbeat(data))
      .catch((err) => console.error("Heartbeat fetch error:", err))
      .finally(() => setLoading(false));
  }, [ne_id, refreshKey]);

  if (loading) return <CircularProgress size={16} />;

  if (!heartbeat)
    return (
      <Typography variant="body2" color="text.secondary">
        No data
      </Typography>
    );

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: heartbeat.healthy ? "success.main" : "error.main",
          }}
        />
        <Typography variant="body1" fontWeight={500}>
          {heartbeat.healthy ? "Healthy" : "Dead"}
        </Typography>
      </Box>
      <Typography variant="caption" color="text.secondary">
        {new Date(heartbeat.checked_at).toLocaleString()}
      </Typography>
    </Box>
  );
}

export function ElementsPage() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [elements, setElements] = useState<NetworkElement[]>([]);
  const [, setLoading] = useState(true);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [refreshKeys, setRefreshKeys] = useState<Record<string, number>>({});

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [elementToDelete, setElementToDelete] = useState<NetworkElement | null>(
    null,
  );

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchNetworkElements()
      .then((data) => setElements(data))
      .catch(() => {
        setSnackbar({
          open: true,
          message: "Failed to load network elements.",
          severity: "error",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteClick = (element: NetworkElement) => {
    setElementToDelete(element);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!elementToDelete) return;
    try {
      await deleteNetworkElements(elementToDelete.id);
      setElements((prev) => prev.filter((el) => el.id !== elementToDelete.id));
      setSnackbar({
        open: true,
        message: "Element deleted!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to delete element.",
        severity: "error",
      });
    } finally {
      setDeleteDialogOpen(false);
      setElementToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setElementToDelete(null);
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const handleSync = async (id: string) => {
    setSyncingId(id);
    try {
      await syncNetworkElements(id);
      setSnackbar({
        open: true,
        message: "Sync completed!",
        severity: "success",
      });
    } catch (error) {
      const msg = (error as Error).message;
      setSnackbar({
        open: true,
        message: msg.includes("no active")
          ? "Device is not connected"
          : "Failed to sync",
        severity: "error",
      });
    } finally {
      setSyncingId(null);
    }
  };

  const handlePowerOff = async (ne_id: string, name: string) => {
    try {
      await powerOffNetworkElement(ne_id);
      setSnackbar({
        open: true,
        message: `Heartbeat loss test for ${name}.`,
        severity: "warning",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to simulate heartbeat loss.",
        severity: "error",
      });
    }
  };

  const handleCheckHeartbeat = async (ne_id: string) => {
    try {
      await checkHeartbeat(ne_id);
      setRefreshKeys((prev) => ({
        ...prev,
        [ne_id]: (prev[ne_id] || 0) + 1,
      }));
      setSnackbar({
        open: true,
        message: "Heartbeat check successful! Device is healthy.",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to check heartbeat.",
        severity: "error",
      });
    }
  };

  const handleTriggerAlarm = async (
    ne_id: string,
    severity: string,
    message: string,
  ) => {
    try {
      await createTestAlarm({ ne_id, severity, message });
      setSnackbar({
        open: true,
        message: `Test ${severity} alarm created!`,
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Failed to create ${severity} test alarm`,
        severity: "error",
      });
    }
  };

  const columns = useMemo(() => getElementsTableColumns(), []);

  return (
    <Box>
      <Table
        title="Network Elements"
        rows={elements}
        columns={columns}
        fetchDetails={fetchElementDetails}
        onAdd={() => navigate("/elements/add")}
        renderDetails={(row, additionalData) => (
          <Paper elevation={0} sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Device name
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ wordBreak: "break-word" }}
                >
                  {row.name}
                </Typography>
              </Box>

              <Box display="flex" gap={1}>
                <Tooltip title="Trigger Critical Alarm">
                  <IconButton
                    color="error"
                    onClick={() =>
                      handleTriggerAlarm(
                        row.id,
                        "critical",
                        "test critical alarm",
                      )
                    }
                  >
                    <NetworkCell />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Simulate Heartbeat Loss">
                  <IconButton
                    color="warning"
                    onClick={() => handlePowerOff(row.id, row.name)}
                  >
                    <AlertIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Check Heartbeat (Ping)">
                  <IconButton
                    color="error"
                    onClick={() => handleCheckHeartbeat(row.id)}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Sync element">
                  <span>
                    <IconButton
                      color="primary"
                      onClick={() => handleSync(row.id)}
                      disabled={syncingId === row.id}
                    >
                      <SyncIcon />
                    </IconButton>
                  </span>
                </Tooltip>

                <Tooltip title="Delete element">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 3,
                mb: 4,
              }}
            >
              <Box>
                <Typography color="text.secondary" variant="body2" mb={0.5}>
                  ID
                </Typography>
                <Typography variant="body1" fontFamily="monospace">
                  {row.id}
                </Typography>
              </Box>

              <Box>
                <Typography color="text.secondary" variant="body2" mb={0.5}>
                  IP Address
                </Typography>
                <Typography variant="body1" fontFamily="monospace">
                  {row.address}
                </Typography>
              </Box>

              <Box>
                <Typography color="text.secondary" variant="body2" mb={0.5}>
                  Vendor
                </Typography>
                <Typography variant="body1">{row.vendor}</Typography>
              </Box>

              <Box>
                <Typography color="text.secondary" variant="body2" mb={0.5}>
                  Status
                </Typography>
                <Status status={row.status as AllStatuses} />
              </Box>

              <Box>
                <Typography color="text.secondary" variant="body2" mb={0.5}>
                  Heartbeat Status
                </Typography>
                <HeartbeatDisplay
                  ne_id={row.id}
                  refreshKey={refreshKeys[row.id] || 0}
                />
              </Box>

              <Box>
                <Typography color="text.secondary" variant="body2" mb={0.5}>
                  Updated
                </Typography>
                <Typography variant="body2">
                  {new Date(row.updated_at).toLocaleString()}
                </Typography>
              </Box>
            </Box>

            <Box mb={4}>
              <Typography color="text.secondary" variant="body2" mb={1}>
                Capabilities
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {Array.isArray(row.capabilities)
                  ? row.capabilities.map((cap: string, index: number) => (
                      <Chip
                        key={index}
                        label={cap}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderRadius: 1.5,
                          borderColor: theme.palette.divider,
                        }}
                      />
                    ))
                  : null}
              </Box>
            </Box>

            {!!additionalData && !(additionalData as any)?.notSynced && (
              <Accordion
                disableGutters
                elevation={0}
                sx={{
                  backgroundColor: "transparent",
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: "8px !important",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={600} color="text.secondary">
                    Advanced / Raw Inventory Data
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      overflowX: "auto",
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      borderRadius: "0 0 8px 8px",
                    }}
                  >
                    <pre style={{ margin: 0, fontSize: "0.85rem" }}>
                      {JSON.stringify(additionalData, null, 2)}
                    </pre>
                  </Paper>
                </AccordionDetails>
              </Accordion>
            )}

            {!!additionalData && (additionalData as any)?.notSynced && (
              <Box mt={3}>
                <Alert
                  variant="outlined"
                  severity="warning"
                  action={
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      onClick={() => handleSync(row.id)}
                      sx={{ textTransform: "none", boxShadow: "none" }}
                    >
                      Sync now
                    </Button>
                  }
                  sx={{
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    "& .MuiAlert-action": { padding: 0, alignSelf: "center" },
                  }}
                >
                  This device isn't synced yet
                </Alert>
              </Box>
            )}
          </Paper>
        )}
      />

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{elementToDelete?.name}"? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDeleteCancel} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            snackbar.severity as "success" | "error" | "warning" | "info"
          }
          variant="filled"
          sx={{ width: "100%", boxShadow: 3 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
