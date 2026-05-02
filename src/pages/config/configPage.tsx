import { type ChangeEvent, useState, useEffect } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Divider,
} from "@mui/material";

import {
  type NetworkElement,
  type CMHistoryItem,
} from "../../entities/Element/Element";
import {
  fetchNetworkElements,
  changeNetworkElement,
  fetchCMNetworkElementById,
} from "../../entities/Element/api/apiElement";

export function ConfigPage() {
  const [elements, setElements] = useState<NetworkElement[]>([]);
  const [selectedNeId, setSelectedNeId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState<CMHistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const [elementData, setElementData] = useState({
    param: "",
    value: "",
  });

  const [errors, setErrors] = useState({
    neId: "",
    param: "",
    value: "",
  });

  const loadElements = async () => {
    try {
      const data = await fetchNetworkElements();
      setElements(data);
    } catch (error) {
      console.error("Failed to fetch network elements:", error);
      setSnackbar({
        open: true,
        message: "Failed to load network elements.",
        severity: "error",
      });
    }
  };

  const loadHistory = async () => {
    setHistoryLoading(true);
    try {
      const data = await fetchCMNetworkElementById();
      setHistory(Array.isArray(data) ? data.reverse() : []);
    } catch (error) {
      console.error("Failed to fetch CM history:", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    loadElements();
    loadHistory();
  }, []);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedNeId(event.target.value);
    if (errors.neId) setErrors((prev) => ({ ...prev, neId: "" }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setElementData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name as string]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { neId: "", param: "", value: "" };

    if (!selectedNeId) {
      newErrors.neId = "Please select a Network Element";
      isValid = false;
    }
    if (!elementData.param.trim()) {
      newErrors.param = "Parameter name is required";
      isValid = false;
    }
    if (!elementData.value.trim()) {
      newErrors.value = "Value is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        ne_id: selectedNeId,
        parameter: elementData.param,
        value: elementData.value,
      };

      await changeNetworkElement(payload);
      setSnackbar({
        open: true,
        message: "Configuration successfully applied!",
        severity: "success",
      });
      setElementData({ param: "", value: "" });
      await loadHistory();
    } catch (error) {
      console.error("Error changing element ", error);
      setSnackbar({
        open: true,
        message:
          (error as Error).message ||
          "Failed to apply configuration. Please try again.",
        severity: "error",
      });
      await loadHistory();
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedNeId("");
    setElementData({ param: "", value: "" });
    setErrors({ neId: "", param: "", value: "" });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const getStatusColor = (status?: string) => {
    if (!status) return "default";
    if (status.toLowerCase() === "success") return "success";
    if (status.toLowerCase() === "failed") return "error";
    return "warning";
  };

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Paper
        elevation={0}
        sx={{ p: 4, borderRadius: 3, mb: 4, borderColor: "divider" }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600, mb: 4 }}
        >
          Change Parameter
        </Typography>

        <Stack spacing={3}>
          <FormControl fullWidth error={!!errors.neId}>
            <InputLabel id="ne-select">Select Network Element</InputLabel>
            <Select
              labelId="ne-select"
              name="vendor"
              required
              value={selectedNeId}
              label="Select Network Element"
              onChange={handleSelectChange}
            >
              {elements.length === 0 ? (
                <MenuItem value="" disabled>
                  Loading...
                </MenuItem>
              ) : (
                elements.map((el) => (
                  <MenuItem key={el.id} value={el.id}>
                    {el.name} : {el.address}
                  </MenuItem>
                ))
              )}
            </Select>
            {errors.neId && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: 0.5, ml: 2 }}
              >
                {errors.neId}
              </Typography>
            )}
          </FormControl>

          <TextField
            autoComplete="off"
            required
            label="Parameter"
            name="param"
            placeholder="pci"
            value={elementData.param}
            onChange={handleChange}
            error={!!errors.param}
            helperText={errors.param}
            fullWidth
            variant="outlined"
          />

          <TextField
            autoComplete="off"
            required
            label="Value"
            name="value"
            placeholder="150"
            value={elementData.value}
            onChange={handleChange}
            error={!!errors.value}
            helperText={errors.value}
            fullWidth
            variant="outlined"
          />
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ pt: 3 }}
        >
          <Button variant="outlined" onClick={handleCancel} disabled={loading}>
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={loading}
            size="large"
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {loading ? "Applying..." : "Apply Change"}
          </Button>
        </Stack>

        <Divider sx={{ my: 5 }} />

        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          History
        </Typography>

        {historyLoading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : history.length === 0 ? (
          <Typography color="text.secondary" align="center">
            No configuration changes found.
          </Typography>
        ) : (
          <TableContainer>
            <Table size="medium">
              <TableHead sx={{ bgcolor: "background.default" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>
                    Network Element
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Parameter</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>New Value</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((row, index) => {
                  const elementObj = elements.find((el) => el.id === row.ne_id);
                  const displayName = elementObj ? elementObj.name : row.ne_id;

                  return (
                    <TableRow key={row.id || index} hover>
                      <TableCell>{displayName}</TableCell>
                      <TableCell sx={{ fontFamily: "monospace" }}>
                        {row.parameter}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "monospace" }}>
                        {row.value}
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={row.status || "UNKNOWN"}
                          color={getStatusColor(row.status)}
                          size="small"
                          variant="outlined"
                          sx={{
                            textTransform: "uppercase",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
