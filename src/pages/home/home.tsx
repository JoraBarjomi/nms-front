import { Box, Typography } from "@mui/material";

export function HomePage() {
  return (
    <Box display="flex" gap={2} alignItems="center">
      <Typography color="text.secondary" fontWeight={600}>
        Home page
      </Typography>
    </Box>
  );
}
