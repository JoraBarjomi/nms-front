import React from "react";
import classes from "./ButtonAction.module.css";

type ButtonProps = {
  children: React.ReactNode;
  active?: boolean;
};

export function ButtonAction({ children, active }: ButtonProps) {
  return (
    <button
      className={
        active ? `${classes.styled} ${classes.active}` : classes.styled
      }
    >
      {children}
    </button>
  );
}
