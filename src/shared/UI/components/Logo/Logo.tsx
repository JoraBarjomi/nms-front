import React from "react";
import { LogoIcon } from "../../icons/icons";
import classes from "./Logo.module.css";

export function Logo() {
  return (
    <div className={classes.logo_items}>
      <LogoIcon />
      <h1 className={classes.poppins_medium}>NMS</h1>
    </div>
  );
}
