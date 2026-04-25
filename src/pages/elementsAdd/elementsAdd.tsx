import React, { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask";
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
  Chip,
  type SlideProps,
  Box,
} from "@mui/material";
import { createNetworkElement } from "./api/api";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const IPAddressMask = React.forwardRef<HTMLInputElement, CustomProps>(
  function IPAddressMask(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="[000].[000].[000].[000]"
        blocks={{
          "000": {
            mask: /^[0-9]{1,3}$/,
            from: 0,
            to: 255,
            autofix: true,
          },
        }}
        inputRef={ref}
        onAccept={(value: string) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
        lazy={false}
        placeholderChar="_"
      />
    );
  },
);

export function ElementsAddPage() {
  const navigate = useNavigate();

  const [elementData, setElementData] = useState({
    name: "",
    ipAddress: "",
    vendor: "",
    capabilities: [] as string[],
  });

  const [errors, setErrors] = useState({
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

  const validateForm = () => {
    const newErrors = {
      name: "",
      ipAddress: "",
      vendor: "",
      capabilities: "",
    };
    let isValid = true;

    if (!elementData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (elementData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      isValid = false;
    }

    const ipSegments = elementData.ipAddress
      .split(".")
      .map((s) => s.replace(/_/g, "").trim());
    const isIpComplete =
      ipSegments.length === 4 && ipSegments.every((s) => s.length > 0);

    if (!isIpComplete) {
      newErrors.ipAddress = "Please enter a full IP address (e.g., 10.0.0.1)";
      isValid = false;
    }

    if (!elementData.vendor) {
      newErrors.vendor = "Please select a vendor";
      isValid = false;
    }

    if (elementData.capabilities.length === 0) {
      newErrors.capabilities = "Please select at least one capability";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e:
      | SelectChangeEvent<string | string[]>
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  const handleCreate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        ...elementData,
        capabilities: elementData.capabilities.join(", "),
      };

      await createNetworkElement(payload);

      setSnackbar({
        open: true,
        message: "Network element successfully created!",
        severity: "success",
      });
      setTimeout(() => navigate("/elements"), 1500);
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
      capabilities: [],
    });
    setErrors({
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
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
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
            error={!!errors.name}
            helperText={errors.name}
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
            error={!!errors.ipAddress}
            helperText={errors.ipAddress}
            fullWidth
            variant="outlined"
            InputProps={{
              inputComponent: IPAddressMask as any,
            }}
          />

          <FormControl fullWidth error={!!errors.vendor}>
            <InputLabel>Vendor</InputLabel>
            <Select
              name="vendor"
              required
              value={elementData.vendor}
              label="Vendor"
              onChange={handleChange}
            >
              <MenuItem value={"vendor-a"}>Vendor-A</MenuItem>
              <MenuItem value={"vendor-b"}>Vendor-B</MenuItem>
              <MenuItem value={"vendor-c"}>Vendor-C</MenuItem>
            </Select>
            {errors.vendor && (
              <Typography
                variant="caption"
                color="error"
                sx={{ ml: 1.5, mt: 0.5 }}
              >
                {errors.vendor}
              </Typography>
            )}
          </FormControl>

          <FormControl fullWidth error={!!errors.capabilities}>
            <InputLabel>Capabilities</InputLabel>
            <Select
              multiple
              name="capabilities"
              required
              value={elementData.capabilities}
              label="Capabilities"
              onChange={handleChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              <MenuItem value={"a"}>a</MenuItem>
              <MenuItem value={"b"}>b</MenuItem>
              <MenuItem value={"c"}>c</MenuItem>
            </Select>
            {errors.capabilities && (
              <Typography
                variant="caption"
                color="error"
                sx={{ ml: 1.5, mt: 0.5 }}
              >
                {errors.capabilities}
              </Typography>
            )}
          </FormControl>

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
        TransitionComponent={SlideTransition}
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
