import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Container,
  Snackbar,
  Alert,
  CircularProgress,
  Slide,
  type SlideProps,
} from "@mui/material";
import { createNetworkElement } from "./api/api";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export function AddPage() {
  const navigate = useNavigate();
  const [elementData, setElementData] = useState({
    name: "",
    ipAddress: "",
    vendor: "",
    capabilities: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setElementData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      await createNetworkElement(elementData);
      setSnackbar({
        open: true,
        message: "Network element successfully created!",
        severity: "success",
      });
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error creating element ", error);
      setSnackbar({
        open: true,
        message: "Failed to create network element. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setElementData({
      name: "",
      ipAddress: "",
      vendor: "",
      capabilities: "",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600, mb: 3 }}
        >
          Add Network Element
        </Typography>

        <Stack spacing={3}>
          <TextField
            autoComplete="off"
            required
            label="Name"
            name="name"
            placeholder="enb-1"
            value={elementData.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />

          <TextField
            autoComplete="off"
            required
            label="IP Address"
            name="ipAddress"
            placeholder="10.0.0.1"
            value={elementData.ipAddress}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />

          <TextField
            autoComplete="off"
            required
            label="Vendor"
            name="vendor"
            placeholder="vendor-a"
            value={elementData.vendor}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />

          <TextField
            autoComplete="off"
            required
            label="Capabilities"
            name="capabilities"
            placeholder="capabilities"
            value={elementData.capabilities}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ pt: 2 }}
          >
            <Button
              variant="outlined"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCreate}
              disabled={loading}
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : null
              }
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </Stack>
        </Stack>
      </Paper>

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
    </Container>
  );
}
