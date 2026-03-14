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

const App: React.FC = () => {
  const location = useLocation();
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
    }
  };

  return (
    <div className={classes.layout}>
      <SideMenu />
      <div className={classes.body}>
        <Header curPage={getPageTitle(location.pathname)} userInfo={"G"} />
        <main className={classes.content}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/dashboard" element={<DashboardPage />}></Route>
            <Route path="/alarms" element={<AlarmsPage />}></Route>
            <Route path="/devices" element={<DevicesPage />}></Route>
            <Route path="/logs" element={<LogsPage />}></Route>
            <Route path="/config" element={<ConfigPage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
