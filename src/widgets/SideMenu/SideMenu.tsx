import { NavLink } from "react-router-dom";
import { Logo } from "../../shared/UI/components/Logo/Logo";

import {
  styled,
  useTheme,
  type Theme,
  type CSSObject,
} from "@mui/material/styles";

import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

import {
  DashboardIcon,
  AlertIcon,
  DevicesIcon,
  LogsIcon,
  ConfigIcon,
  SettingsIcon,
  SupportIcon,
} from "../../shared/UI/icons/icons";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: theme.palette.background.paper,
  borderRight: "none",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  backgroundColor: theme.palette.background.paper,
  borderRight: "none",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const mainMenuItems = [
  // { text: "Home", icon: <HomeIcon />, path: "/" },
  { text: "Elements", icon: <DevicesIcon />, path: "/elements" },
  { text: "Alarms", icon: <AlertIcon />, path: "/alarms" },
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Logs", icon: <LogsIcon />, path: "/logs" },
  { text: "Config", icon: <ConfigIcon />, path: "/config" },
];

const secondaryMenuItems = [
  { text: "Support", icon: <SupportIcon />, path: "/support" },
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

type SideMenuProps = {
  open?: boolean;
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
};

export function SideMenu({
  open,
  handleDrawerClose,
  handleDrawerOpen,
}: SideMenuProps) {
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            opacity: open ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          <Logo open={open} />
        </Box>
        <IconButton
          onClick={open ? handleDrawerClose : handleDrawerOpen}
          sx={{
            color: "white",
            transition: "transform 0.2s",
          }}
        >
          {open ? (
            theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )
          ) : theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {mainMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <NavLink
              to={item.path}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {({ isActive }) => (
                <ListItemButton
                  selected={isActive}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 0,
                      justifyContent: "center",
                      color: "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List>
        {secondaryMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <NavLink
              to={item.path}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {({ isActive }) => (
                <ListItemButton
                  selected={isActive}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 0,
                      justifyContent: "center",
                      color: "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
