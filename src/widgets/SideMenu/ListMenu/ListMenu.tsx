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
          {({ isActive }) => (
            <ButtonMenu active={isActive}>
              {" "}
              <HomeIcon /> Home
            </ButtonMenu>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className={classes.link}>
          {({ isActive }) => (
            <ButtonMenu active={isActive}>
              {" "}
              <DashboardIcon />
              Dashboard
            </ButtonMenu>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/alarms" className={classes.link}>
          {({ isActive }) => (
            <ButtonMenu active={isActive}>
              {" "}
              <AlertIcon />
              Alarms
            </ButtonMenu>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/devices" className={classes.link}>
          {({ isActive }) => (
            <ButtonMenu active={isActive}>
              {" "}
              <DevicesIcon />
              Devices
            </ButtonMenu>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/logs" className={classes.link}>
          {({ isActive }) => (
            <ButtonMenu active={isActive}>
              {" "}
              <LogsIcon />
              Logs
            </ButtonMenu>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/config" className={classes.link}>
          {({ isActive }) => (
            <ButtonMenu active={isActive}>
              {" "}
              <ConfigIcon />
              Config
            </ButtonMenu>
          )}
        </NavLink>
      </li>
      <menu className={classes.bottomMenu}>
        <li>
          <NavLink to="/support" className={classes.link}>
            {({ isActive }) => (
              <ButtonMenu active={isActive}>
                {" "}
                <SupportIcon />
                Support
              </ButtonMenu>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={classes.link}>
            {({ isActive }) => (
              <ButtonMenu active={isActive}>
                {" "}
                <SettingsIcon />
                Settings
              </ButtonMenu>
            )}
          </NavLink>
        </li>
      </menu>
    </menu>
  );
}
