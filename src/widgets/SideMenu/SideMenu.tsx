import React from "react";
import { Logo } from "../../shared/UI/components/Logo/Logo";
import { ListMenu } from "./ListMenu/ListMenu";
import classes from "./SideMenu.module.css";

export function SideMenu() {
  return (
    <menu className={classes.menu}>
      <Logo />
      <ListMenu></ListMenu>
    </menu>
  );
}
