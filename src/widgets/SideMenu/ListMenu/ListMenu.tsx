import React from "react";
import { NavLink } from "react-router-dom";
import { ButtonMenu } from "../../../shared/UI/components/ButtonMenu/ButtonMenu";
import classes from "./ListMenu.module.css";

import {
  HomeIcon,
  DashboardIcon,
  AlertIcon,
  DevicesIcon,
  LogsIcon,
  ConfigIcon,
  SettingsIcon,
  SupportIcon,
} from "../../../shared/UI/icons/icons";

export function ListMenu() {
  return (
    <menu className={classes.menuBar}>
      <li>
        <NavLink to="/" className={classes.link}>
          <ButtonMenu>
            {" "}
            <HomeIcon /> Home
          </ButtonMenu>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className={classes.link}>
          <ButtonMenu>
            {" "}
            <DashboardIcon />
            Dashboard
          </ButtonMenu>
        </NavLink>
      </li>
      <li>
        <NavLink to="/alarms" className={classes.link}>
          <ButtonMenu>
            {" "}
            <AlertIcon />
            Alarms
          </ButtonMenu>
        </NavLink>
      </li>
      <li>
        <NavLink to="/devices" className={classes.link}>
          <ButtonMenu>
            {" "}
            <DevicesIcon />
            Devices
          </ButtonMenu>
        </NavLink>
      </li>
      <li>
        <NavLink to="/logs" className={classes.link}>
          <ButtonMenu>
            {" "}
            <LogsIcon />
            Logs
          </ButtonMenu>
        </NavLink>
      </li>
      <li>
        <NavLink to="/config" className={classes.link}>
          <ButtonMenu>
            {" "}
            <ConfigIcon />
            Config
          </ButtonMenu>
        </NavLink>
      </li>
      <menu className={classes.bottomMenu}>
        <li>
          <ButtonMenu>
            {" "}
            <SupportIcon />
            Support
          </ButtonMenu>
        </li>
        <li>
          <ButtonMenu>
            {" "}
            <SettingsIcon />
            Settings
          </ButtonMenu>
        </li>
      </menu>
    </menu>
  );
}
