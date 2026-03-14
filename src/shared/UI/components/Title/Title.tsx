import React from "react";
import classes from "./Title.module.css";

type TitleProps = {
  children: React.ReactNode;
};

export function Title({ children }: TitleProps) {
  return <h1 className={classes.text}>{children}</h1>;
}
