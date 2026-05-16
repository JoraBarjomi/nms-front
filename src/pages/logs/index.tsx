import { Box, Paper, Typography } from "@mui/material";
import { TerminalProvider, TerminalShell } from "../../features/terminal";
import { useDefaultCommands } from "../../features/terminal/useDefaultCommands";

export function LogsPage() {
  return (
    <TerminalProvider>
      <LogsPageInner />
    </TerminalProvider>
  );
}

export function LogsPageInner() {
  useDefaultCommands();
  return (
    <Box sx={{ width: "100%", pt: 1 }}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.default",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: "#26A269", mb: 1, fontFamily: "monospace" }}
        >
          NMS CLI
        </Typography>

        <TerminalShell height={400} />
      </Paper>
    </Box>
  );
}
