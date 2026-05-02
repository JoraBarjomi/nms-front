import {
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";

import { getUser, logout, getInitials } from "../../shared/utils/authHelpers";

export function ProfilePage() {
  const user = getUser();

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <Typography variant="h5" fontWeight={600} mb={4} color="text.primary">
          Please Sign in!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", p: { xs: 2, md: 4 } }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mb: 2,
              fontSize: "2.5rem",
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            {getInitials(user.username)}
          </Avatar>

          <Typography variant="h5" fontWeight={600} gutterBottom>
            {user.username}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="subtitle2"
          color="text.secondary"
          textTransform="uppercase"
          fontWeight={700}
          mb={1}
        >
          Account Details
        </Typography>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemText primary="User ID" secondary={user.id} />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary="Session Started"
              secondary={user.sessionStart}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary="Session Expires"
              secondary={user.sessionEnd}
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Button
          variant="outlined"
          color="error"
          fullWidth
          size="large"
          startIcon={<LogoutIcon />}
          onClick={logout}
          sx={{ borderRadius: 2, fontWeight: 600, mt: "auto" }}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
}
