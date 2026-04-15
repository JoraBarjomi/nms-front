import React from "react";
import { NavLink } from "react-router-dom";

import { styled } from "@mui/material/styles";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const drawerWidth = 250;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "none",
  zIndex: theme.zIndex.drawer,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(100% - ${theme.spacing(8)} + 1px)`,
  marginLeft: theme.spacing(8),

  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type HeaderProps = {
  curPage?: React.ReactNode;
  userInfo?: React.ReactNode;
  isLogin?: boolean;
  open?: boolean;
};

export function Header({ curPage, userInfo, isLogin, open }: HeaderProps) {
  return (
    <AppBar position="fixed" open={open}>
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
    </AppBar>
  );
}
