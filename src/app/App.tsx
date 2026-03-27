import React from "react";
import { SideMenu } from "../widgets/SideMenu/SideMenu";
import { Header } from "../widgets/Header/Header";
import classes from "./App.module.css";

import { Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "../pages/home/index";
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

const App: React.FC = () => {
  const location = useLocation();

  const layoutPages = [
    "/",
    "/dashboard",
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
    <div className={classes.layout}>
      <SideMenu />
      <div className={classes.body}>
        <Header
          curPage={getPageTitle(location.pathname)}
          userInfo={"G"}
          isLogin={false}
        />
        <main className={classes.content}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
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
        </main>
      </div>
    </div>
  );
};

export default App;
