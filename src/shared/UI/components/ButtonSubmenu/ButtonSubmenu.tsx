import React from "react";
import classes from "./ButtonSubmenu.module.css";

type ButtonProps = {
  children: React.ReactNode;
  active?: boolean;
};

export function ButtonSubmenu({ children, active }: ButtonProps) {
  return (
    <button
      className={
        active ? `${classes.styled} ${classes.activeStatus}` : classes.styled
      }
    >
      {children}
    </button>
  );
}
