import React from "react";
import { NavLink } from "react-router-dom";

import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

type HeaderProps = {
  curPage?: React.ReactNode;
  userInfo?: React.ReactNode;
  isLogin?: boolean;
  open?: boolean;
};

export function Header({ curPage, userInfo, isLogin }: HeaderProps) {
  const theme = useTheme();

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

        {isLogin ? (
          <NavLink
            to="/profile"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {userInfo}
          </NavLink>
        ) : (
          <Button variant="contained" component={NavLink} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}
