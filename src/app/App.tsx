import React from "react";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

import Box from "@mui/material/Box";
import { SideMenu } from "../widgets/SideMenu/SideMenu";
import { Header } from "../widgets/Header/Header";

import { HomePage } from "../pages/home/home";
import { ElementsPage } from "../pages/elements/elements";
import { ElementsAddPage } from "../pages/elementsAdd/elementsAdd";
import { RegisterPage } from "../pages/register/registerPage";
import { LoginPage } from "../pages/login/login";
import { DashboardPage } from "../pages/dashboard/dashbaord";
import { AlarmsPage } from "../pages/alarms/alarms";
import { LogsPage } from "../pages/logs";
import { ConfigPage } from "../pages/config/configPage";
import { SupportPage } from "../pages/support";
import { SettingsPage } from "../pages/settings";
import { ProfilePage } from "../pages/profile/profilePage";
import { NotFoundPage } from "../pages/notFound/index";

import { getUser } from "../shared/utils/authHelpers";
import { ProtectedRoute } from "../shared/utils/protectedRoute";
import { useAppTheme } from "./AppThemeContext";

const App: React.FC = () => {
  const { toggleTheme } = useAppTheme();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const user = getUser();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
      case "/elements":
        return "Elements";
      case "/elements/add":
        return "Add Element";
      case "/logs":
        return "Logs";
      case "/config":
        return "Config";
      case "/support":
        return "Support";
      case "/settings":
        return "Settings";
      case "/profile":
        return `Profile/${user?.username}`;
      case "/login":
        return "Login";
      case "/register":
        return "Register";
      default:
        return "NMS";
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>

      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <Box
              sx={{
                display: "flex",
                height: "100vh",
                backgroundColor: "background.default",
              }}
            >
              <SideMenu
                open={open}
                handleDrawerClose={handleDrawerClose}
                handleDrawerOpen={handleDrawerOpen}
                toggleTheme={toggleTheme}
              />

              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  width: { sm: `calc(100% - ${open ? 250 : 65}px)` },
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                  transition: (theme) =>
                    theme.transitions.create(["width", "margin"], {
                      easing: theme.transitions.easing.sharp,
                      duration: open
                        ? theme.transitions.duration.enteringScreen
                        : theme.transitions.duration.leavingScreen,
                    }),
                }}
              >
                <Header open={open} curPage={getPageTitle(location.pathname)} />

                <Box sx={{ p: 3, flexGrow: 1, color: "text.primary" }}>
                  <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ height: "100%" }}
                  >
                    <Outlet />
                  </motion.div>
                </Box>
              </Box>
            </Box>
          }
        >
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/elements" element={<ElementsPage />}></Route>
          <Route path="/elements/add" element={<ElementsAddPage />}></Route>
          <Route path="/dashboard" element={<DashboardPage />}></Route>
          <Route path="/alarms" element={<AlarmsPage />}></Route>
          <Route path="/logs" element={<LogsPage />}></Route>
          <Route path="/config" element={<ConfigPage />}></Route>
          <Route path="/support" element={<SupportPage />}></Route>
          <Route path="/settings" element={<SettingsPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
