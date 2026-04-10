import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { SideMenu } from "../widgets/SideMenu/SideMenu";
import { Header } from "../widgets/Header/Header";
import { Submenu } from "../shared/UI/components/Submenu/Submenu";

import { HomePage } from "../pages/home/home";
import { DashboardPage } from "../pages/dashboard/index";
import { AlarmsPage } from "../pages/alarms/index";
import { DevicesPage } from "../pages/devices/index";
import { LogsPage } from "../pages/logs/index";
import { ConfigPage } from "../pages/config/index";
import { NotFoundPage } from "../pages/notFound/index";
import { SupportPage } from "../pages/support";
import { SettingsPage } from "../pages/settings";
import { ProfilePage } from "../pages/profile";
import { RegisterPage } from "../pages/register";
import { LoginPage } from "../pages/login";
import { AddPage } from "../pages/add";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const App: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const layoutPages = [
    "/",
    "/add",
    "/dashboard",
    "/devices",
    "/alarms",
    "/logs",
    "/config",
    "/support",
    "/settings",
    "/profile",
  ];

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case "/":
        return "Home";
      case "/add":
        return "Add";
      case "/dashboard":
        return "Dashboard";
      case "/alarms":
        return "Alarms";
      case "/devices":
        return "Devices";
      case "/logs":
        return "Logs";
      case "/config":
        return "Config";
      case "/support":
        return "Support";
      case "/settings":
        return "Settings";
      case "/profile":
        return "Profile/username";
      case "/login":
        return "Login";
      case "/register":
        return "Register";
    }
  };

  const showLayout = layoutPages.includes(location.pathname);

  if (!showLayout) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <SideMenu open={open} handleDrawerClose={handleDrawerClose} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          curPage={getPageTitle(location.pathname)}
          userInfo={"G"}
          isLogin={false}
          submenu={
            (location.pathname === "/" || location.pathname === "/add") && (
              <Submenu
                items={[
                  { to: "/", label: "Network Elements" },
                  { to: "/add", label: "Add Element" },
                ]}
              />
            )
          }
        />
        <DrawerHeader />
        <Box sx={{ p: 3, flexGrow: 1, color: "text.primary" }}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/add" element={<AddPage />}></Route>
            <Route path="/dashboard" element={<DashboardPage />}></Route>
            <Route path="/alarms" element={<AlarmsPage />}></Route>
            <Route path="/devices" element={<DevicesPage />}></Route>
            <Route path="/logs" element={<LogsPage />}></Route>
            <Route path="/config" element={<ConfigPage />}></Route>
            <Route path="/support" element={<SupportPage />}></Route>
            <Route path="/settings" element={<SettingsPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
