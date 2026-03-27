import { NavLink } from "react-router-dom";
import { LogoIcon } from "../../icons/icons";
import classes from "./Logo.module.css";

export function Logo() {
  return (
    <NavLink to="/" className={classes.link}>
      <div className={classes.logo_items}>
        <LogoIcon />
        <h1 className={classes.poppins_medium}>NMS</h1>
      </div>
    </NavLink>
  );
}
