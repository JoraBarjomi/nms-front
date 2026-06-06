import React from "react";
import { NavLink } from "react-router-dom";
import { getInitials, getUser } from "../../shared/utils/authHelpers";

import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { NotificationBell } from "../../shared/UI/components/NotifBell/NotifBell";

type HeaderProps = {
  curPage?: React.ReactNode;
  isLogin?: boolean;
  open?: boolean;
};

export function Header({ curPage }: HeaderProps) {
  const theme = useTheme();
  const user = getUser();

  return (
    <MuiAppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        sx={{
          pl: 3,
          transition: "padding 0.2s",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 500,
          }}
        >
          {curPage}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user && <NotificationBell />}
          {user ? (
            <NavLink
              to="/profile"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <Avatar
                sx={{
                  width: 44,
                  height: 44,
                  mt: 2,
                  mb: 2,
                  fontSize: "1.25rem",
                  lineHeight: 1,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                {getInitials(user.username)}
              </Avatar>
            </NavLink>
          ) : (
            <Button variant="contained" component={NavLink} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}
