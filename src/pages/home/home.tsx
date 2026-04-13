import { useEffect, useState } from "react";
import {
  fetchNetworkElements,
  fetchDetailedNetworkElementById,
  deleteNetworkElements,
  syncNetworkElements,
} from "./api/api";
import { type NetworkElement } from "../../entities/Element";
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
} from "@mui/material";

import { type GridRowId } from "@mui/x-data-grid";
import SyncIcon from "@mui/icons-material/Sync";
import { Delete as DeleteIcon } from "@mui/icons-material";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

const fetchElementDetails = async (id: GridRowId) => {
  return await fetchDetailedNetworkElementById(id as string);
};

export function HomePage() {
  const [elements, setElements] = useState<NetworkElement[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [elementToDelete, setElementToDelete] = useState<NetworkElement | null>(
    null,
  );
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [, setLoading] = useState(true);

  useEffect(() => {
    fetchNetworkElements()
      .then((data) => setElements(data))
      .catch((error) => {
        console.error("Failed to fetch network elements:", error);
        setSnackbar({
          open: true,
          message: "Failed to load network elements. Please refresh the page.",
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
      console.error("Delete failed: ", error);
      setSnackbar({
        open: true,
        message: "Failed to delete element. Please try again.",
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

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

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
      console.error("Sync failed: ", error);
      const msg = (error as Error).message;
      setSnackbar({
        open: true,
        message: msg.includes("no active connection")
          ? "Device is not connected"
          : msg.includes("not found")
            ? "Device not found"
            : "Failed to sync",
        severity: "error",
      });
    } finally {
      setSyncingId(null);
    }
  };

  return (
    <Box>
      <Table
        title="Network Elements"
        rows={elements}
        columns={getElementsTableColumns()}
        fetchDetails={fetchElementDetails}
        renderDetails={(row, additionalData) => (
          <Paper
            elevation={0}
            sx={{
              p: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box display="flex" gap={2} alignItems="center">
                <Typography color="text.secondary" fontWeight={600}>
                  Device name:{" "}
                </Typography>
                <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                  {row.name}
                </Typography>
              </Box>

              <Box display="flex" gap={2}>
                <Button
                  variant="outlined"
                  size="medium"
                  startIcon={<SyncIcon />}
                  onClick={() => handleSync(row.id)}
                  disabled={syncingId === row.id}
                >
                  {syncingId === row.id ? "Syncing" : "Sync"}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="medium"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteClick(row)}
                >
                  Delete
                </Button>
              </Box>
            </Box>

            <Divider
              sx={{
                mb: 3,
              }}
            />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(1, 2fr)",
                  md: "repeat(1, 2fr)",
                },
                gap: 3,
              }}
            >
              <Box display="flex" gap={2}>
                <Typography color="text.secondary" fontWeight={600}>
                  ID:{" "}
                </Typography>
                <Typography
                  variant="body1"
                  fontFamily="monospace"
                  sx={{ fontWeight: 500 }}
                >
                  {row.id}
                </Typography>
              </Box>
              <Box display="flex" gap={2} alignItems="center">
                <Typography color="text.secondary" fontWeight={600}>
                  IP Address:{" "}
                </Typography>
                <Typography variant="body1" fontFamily="monospace">
                  {row.address}
                </Typography>
              </Box>
              <Box display="flex" gap={2} alignItems="center">
                <Typography color="text.secondary" fontWeight={600}>
                  Vendor:{" "}
                </Typography>
                <Typography variant="body1">{row.vendor}</Typography>
              </Box>
              <Box display="flex" gap={2} alignItems="center">
                <Typography color="text.secondary" fontWeight={600}>
                  Created:{" "}
                </Typography>
                <Typography variant="body2">
                  {new Date(row.created_at).toLocaleString()}
                </Typography>
              </Box>
              <Box display="flex" gap={2} alignItems="center">
                <Typography color="text.secondary" fontWeight={600}>
                  Updated:{" "}
                </Typography>
                <Typography variant="body2">
                  {new Date(row.updated_at).toLocaleString()}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" gap={2} sx={{ mt: 3 }}>
              <Typography color="text.secondary" fontWeight={600}>
                Capabilities:{" "}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {row.capabilities.map((cap, index) => (
                  <Chip
                    key={index}
                    label={cap}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: 1.5,
                      borderColor: "primary.light",
                      color: "primary.dark",
                    }}
                  />
                ))}
              </Box>
            </Box>
            <Box display="flex" gap={2} alignItems="center" marginTop={2}>
              <Typography color="text.secondary" fontWeight={600}>
                Status:{" "}
              </Typography>{" "}
              <Status status={row.status as AllStatuses} />
            </Box>
            {additionalData && !additionalData.notSynced && (
              <>
                <Box display="flex" gap={2} alignItems="center" marginTop={2}>
                  <Typography color="text.secondary" fontWeight={600}>
                    Synced at:
                  </Typography>
                  <Typography variant="body2">
                    {new Date(additionalData.synced_at).toLocaleString()}
                  </Typography>
                </Box>
                {/* <Box display="flex" gap={2} alignItems="center" marginTop={2}>
                  <Typography color="text.secondary" fontWeight={600}>
                    {additionalData.objects[2].class} earfcnDL:
                  </Typography>
                  <Typography variant="body2">
                    {additionalData.objects[2].attributes.earfcnDL}
                  </Typography>
                </Box>
                <Box display="flex" gap={2} alignItems="center" marginTop={2}>
                  <Typography color="text.secondary" fontWeight={600}>
                    {additionalData.objects[2].class} pci:
                  </Typography>
                  <Typography variant="body2">
                    {additionalData.objects[2].attributes.pci}
                  </Typography>
                </Box>
                <Box display="flex" gap={2} alignItems="center" marginTop={2}>
                  <Typography color="text.secondary" fontWeight={600}>
                    {additionalData.objects[3].class} earfcn:
                  </Typography>
                  <Typography variant="body2">
                    {additionalData.objects[3].attributes.earfcn}
                  </Typography>
                </Box> */}
              </>
            )}

            {additionalData?.notSynced && (
              <Box mt={3}>
                <Alert
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
                    "& .MuiAlert-action": {
                      padding: 0,
                      alignSelf: "center",
                    },
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
        <DialogActions>
          <Button variant="contained" onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteConfirm}
            color="error"
            autoFocus
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
        slotProps={{ transition: SlideTransition }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", boxShadow: 3 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
