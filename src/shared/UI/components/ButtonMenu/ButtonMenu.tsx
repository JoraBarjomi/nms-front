import React from "react";
import classes from "./ButtonMenu.module.css";

type ButtonProps = {
  children: React.ReactNode;
};

const classesAr = [classes.styled, classes.poppins_regular];

export function ButtonMenu({ children }: ButtonProps) {
  return <button className={classesAr.join(" ")}>{children}</button>;
}
